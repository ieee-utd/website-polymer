import * as express from "express";
import * as moment from "moment-timezone";
import * as _ from "lodash";
export let route = express.Router();

import { cleanAll, cleanAnnouncement } from "../helpers/clean";
import { userCan } from "../helpers/verify";
import { Event, EventRecurrence } from "../models";
import { CreateEventSchema, UpdateEventSchema } from "../helpers/schema";
import { TIMEZONE } from "../app";

const validate = require('express-validation');
const crypto = require('crypto');
const base64url = require('base64url');
import { RRule, RRuleSet, rrulestr } from 'rrule';

const PAGINATION_DAYS = 30;
const MAX_GENERATED_RECURRENCES = 60;

function calculateEventRecurrence(recurrenceRule: string, recurrenceExceptions: any, startTime: string | Date, endTime: string | Date) {
  try {

    let originalRule = RRule.fromString(recurrenceRule);

    if (originalRule.origOptions.freq !== RRule.MONTHLY && originalRule.origOptions.freq !== RRule.WEEKLY) {
      return Promise.reject({
        status: 400,
        message: "Recurrence frequency must be monthly or weekly"
      })
    }
    if (!originalRule.origOptions.until) {
      return Promise.reject({
        status: 400,
        message: "Recurrence end date is required"
      })
    }

    //create compound ruleset
    let ruleset = new RRuleSet();
    let ruleOptions = originalRule.origOptions;
    let offsetMins = moment.tz("America/Chicago").utcOffset();
    ruleOptions.dtstart = moment(startTime).add(offsetMins/60, 'hours').toDate();
    ruleOptions.tzid = TIMEZONE;
    ruleOptions.count = MAX_GENERATED_RECURRENCES + 5; //maximum generated events
    ruleset.rrule(new RRule(ruleOptions));
    ruleset.exdate(ruleOptions.dtstart);

    if (recurrenceExceptions) {
      for (var exception of recurrenceExceptions) {
        ruleset.exdate(moment(exception).toDate());
      }
    }

    //calculate event start times (exclude this event's start time)
    let startTimes = ruleset.all();
    if (startTimes.length > MAX_GENERATED_RECURRENCES) {
      return Promise.reject({
        status: 400,
        message: `Too many generated events: please limit the recurrence relation to ${MAX_GENERATED_RECURRENCES} events`
      })
    }

    //calculate event end times
    let dt = moment(endTime).diff(moment(startTime));
    let events = _.map(startTimes, (startTime) => {
      return {
        startTime: moment(startTime).toDate(),
        endTime: moment(startTime).add(dt).toDate()
      }
    });
    return Promise.resolve(events);
  } catch (e) {
    return Promise.reject(e);
  }
}

route.param('link', async function (req : any, res, next, link) {
  var event = await Event.findOne({ link: link })
  .populate('createdBy')
  .populate('updatedBy');

  if (!event) {
    return next({
      status: 404,
      message: "Event not found"
    })
  }

  req.event = event;
  next();
});

//Search and filter events - returns an array of days
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let tags = req.query.t ? req.query.t.split(',') : null;
    // TODO implement search query: let query = req.query.q;
    let since = req.query.s;

    let pred: any = {
      startTime: { $lt: moment().add(PAGINATION_DAYS, 'days').startOf('day').toDate() },
      endTime: { $gte: moment().startOf('day').toDate() },
      hidden: { $ne: true }
    };

    let result: any = { };

    if (since) {
      //we can paginate by the since parameter
      pred.startTime = { $gte: moment(since).startOf('day').toDate() };
      pred.endTime = { $lt: moment(since).add(PAGINATION_DAYS, 'days').startOf('day').toDate() };
      result.next = moment(since).add(PAGINATION_DAYS, 'days').startOf('day').toDate();
      result.prev = moment(since).subtract(PAGINATION_DAYS, 'days').startOf('day').toDate()
    }

    if (tags && tags.length > 0) {
      pred.tags = { $in: tags };
    }

    let events = await Event.listByDay(pred);
    delete pred.__t; //prevent contamination
    delete pred.tags; //tags don't belong here
    let recurrences = await (EventRecurrence as any).listByDay(pred);

    //merge recurrances array into events
    for (var dayData of recurrences) {
      let day = dayData._id.day;
      let indexOfSameOrSmallerDay = _.findIndex(events, (e: any) => {
        return e._id.day <= day;
      })
      if (indexOfSameOrSmallerDay >= 0 && events[indexOfSameOrSmallerDay]._id.day == day) {
        //merge these objects
        for (var e of dayData.events) {
          events[indexOfSameOrSmallerDay].events.push(e)
        }
        events[indexOfSameOrSmallerDay].events = _.sortBy(events[indexOfSameOrSmallerDay].events, 'startTime');
      } else {
        //insert new day
        events.push(dayData)
      }
    }
    //resort events
    events = _.sortBy(events, '_id.day');

    result.dates = _.map(events, (day: any) => {
      day.events = cleanAll(day.events, cleanAnnouncement);
      day.date = moment(day._id.day, "Y-M-D");
      day.day = moment.utc(day.date).format("D");
      day.month = moment.utc(day.date).format("MMMM");
      day.year = moment.utc(day.date).format("YYYY");
      delete day._id;
      return day;
    })
    res.send(result);
  } catch (e) {
    next(e)
  }
});

async function checkEventActiveStatus(event: any) {
  if (moment(event.endTime).isSameOrAfter(moment())) {
    return true;
  }
  if (!event.recurrenceRule) return false;

  //check recurrences
  let latestOccurance: any = await EventRecurrence
  .find({ event: event._id, hidden: { $ne: true }})
  .sort({ endTime: -1 })
  .limit(1);

  if (moment(latestOccurance.endTime).isSameOrAfter(moment())) {
    return true;
  }
  return false;
}

//Get list of events this user can edit
route.get('/editable', userCan("events"), async (req: any, res: any, next: any) => {
  try {
    const auth = req.user.group.permissions.admin ? "all" : req.user.group.permissions.events;

    var query;
    if (auth === "own") {
      query = { createdBy: req.user._id };
    } else if (auth === "all") {
      query = { };
    } else {
      return next({ status: 500, message: "Invalid value for user events access"});
    }

    var events = await Event
    .aggregate()
    .match(query)
    .project({
      content: 0,
      __v: 0,
      _id: 0
    })
    .sort({ startDate: 1 });

    for (var event of events) {
      if (event.recurrenceRule) {
        event.recurrenceRulePretty = rrulestr(event.recurrenceRule).toText();
      }

      //check if event is "active", that is an event that has not yet ended,
      //or have at least one occurrance that has not yet ended

      event.active = await checkEventActiveStatus(event);
    }

    res.send(cleanAll(events, cleanAnnouncement));
  } catch (e) {
    next(e)
  }
})

//Get full details about a specific event
route.get('/:link', async (req: any, res: any, next: any) => {
  try {
    let recurrenceId = req.query.r;
    let event = JSON.parse(JSON.stringify(req.event))

    //get all recurrences
    let allRecurrences = await EventRecurrence
    .find({ event: req.event._id, hidden: { $ne: true }});
    allRecurrences.unshift(event); //insert current event as first item

    event.recurrences = _(allRecurrences)
    .map((recurrence: any) => {
      return {
        startTime: recurrence.startTime,
        endTime: recurrence.endTime,
        linkpart: recurrence.linkpart
      }
    })
    .filter((recurrence: any) => {
      return moment(recurrence.endTime).isAfter(moment())
    })
    .sortBy('startTime')
    .value();

    //get specific recurrence date/time data
    if (recurrenceId) {
      let recurrence: any = await EventRecurrence
      .findOne({ event: req.event._id, linkpart: recurrenceId, hidden: { $ne: true }})
      .populate('event');

      if (recurrence) {
        let updatedEvent = Object.assign(event, {
          link: event.link + "/" + recurrence.linkpart,
          startTime: recurrence.startTime,
          endTime: recurrence.endTime
        })

        res.send(cleanAnnouncement(updatedEvent, true))
        return;
      }
    }

    res.send(cleanAnnouncement(event, true))

  } catch (e) {
    next(e)
  }
});

//Create new event
route.post('/', userCan("events"), validate(CreateEventSchema), async (req: any, res: any, next: any) => {
  try {
    let event = req.body;
    event.link = base64url(crypto.randomBytes(4));
    event.createdBy = req.user._id;
    event.createdOn = Date.now();

    if (moment(event.endTime).isBefore(moment(event.startTime))) {
      return next({
        status: 400,
        message: "Event end time must not be before event start time"
      })
    }

    if (event.recurrenceRule) {
      let recurrencesToGenerate: any = await calculateEventRecurrence(event.recurrenceRule, event.recurrenceExceptions, event.startTime, event.endTime);

      let object = new Event(event);
      let savedEvent = await object.save();

      for (var recurrence of recurrencesToGenerate) {
        recurrence.event = savedEvent._id;
        recurrence.linkpart = base64url(crypto.randomBytes(3));
        let r = new EventRecurrence(recurrence);
        await r.save();
      }
    } else {
      delete event.recurrenceExceptions;

      let object = new Event(event);
      await object.save();
    }

    res.send({ link: event.link, message: "Successfully created event" })
  } catch (e) {
    next(e)
  }
});

//Update event
route.put('/:link', userCan("events"), validate(UpdateEventSchema), async (req: any, res: any, next: any) => {
  try {
    //Verify that user can edit the event
    const auth = req.user.group.permissions.admin ? "all" : req.user.group.permissions.events;
    if (auth === "own") {
      if (req.event.createdBy._id !== req.user._id)
        return next({ status: 403, message: "Access denied" })
    }

    req.body.lastUpdated = Date.now();
    req.body.updatedBy = req.user._id;

    let recurrenceRulesChanged = (req.event.recurrenceRule !== req.body.recurrenceRule) || (JSON.stringify(req.event.recurrenceExceptions || [ ]) !== JSON.stringify(req.body.recurrenceExceptions || [ ]));

    let updatedEvent = Object.assign(req.event, req.body);

    if (moment(updatedEvent.endTime).isBefore(moment(updatedEvent.startTime))) {
      return next({
        status: 400,
        message: "Event end time must not be before event start time",
        errors: {
          startTime: "Invalid value",
          endTime: "Invalid value"
        }
      })
    }

    if (updatedEvent.recurrenceRule && recurrenceRulesChanged) {
      console.warn("Recurrence rules changing")

      let recurrencesToGenerate: any = await calculateEventRecurrence(updatedEvent.recurrenceRule, updatedEvent.recurrenceExceptions, updatedEvent.startTime, updatedEvent.endTime);

      //delete all occurances of event
      await EventRecurrence.remove({ event: req.event._id })

      //reinsert event recurrences
      for (var recurrence of recurrencesToGenerate) {
        recurrence.event = req.event._id;
        recurrence.linkpart = base64url(crypto.randomBytes(3));
        let r = new EventRecurrence(recurrence);
        await r.save();
      }

    }

    if (!updatedEvent.recurrenceRule) {
      req.body.recurrenceRule = null;
      req.body.recurrenceExceptions = [ ];

      await EventRecurrence.remove({ event: req.event._id })
    }

    //update event
    await Event.findOneAndUpdate({ _id: req.event._id }, { $set: req.body })

    res.send({ message: "Event updated" })
  } catch (e) {
    next(e)
  }
});

//Delete event
route.delete('/:link', userCan("events"), async (req: any, res: any, next: any) => {
  try {
    //Verify that user can delete the event
    const auth = req.user.group.permissions.admin ? "all" : req.user.group.permissions.events;
    if (auth === "own") {
      if (req.event.createdBy._id !== req.user._id)
        return next({ status: 403, message: "Access denied" })
    }

    //remove all occurances of event
    await EventRecurrence.remove({ event: req.event._id })

    //remove event
    await Event.remove({ _id: req.event._id });

    res.send({ message: "Event deleted" })
  } catch (e) {
    next(e)
  }
});
