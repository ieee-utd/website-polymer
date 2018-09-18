import * as express from "express";
import * as moment from "moment";
import * as _ from "lodash";
export let route = express.Router();

import { cleanAll, cleanAnnouncement } from "../helpers/clean";
import { userCan } from "../helpers/verify";
import { Event } from "../models";
import { CreateEventSchema, UpdateEventSchema } from "../helpers/schema";

const validate = require('express-validation');
const crypto = require('crypto');
const base64url = require('base64url');

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

const PAGINATION_DAYS = 30;

//Search and filter events - returns an array of days
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let tags = req.query.t ? req.query.t.split(',') : null;
    // TODO implement search query: let query = req.query.q;
    let since = req.query.s;

    console.log(tags)

    let pred: any = {
      startTime: { $lt: moment().add(PAGINATION_DAYS, 'days').startOf('day').toDate() },
      endTime: { $gte: moment().startOf('day').toDate() }
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

    result.dates = _.map(await Event.listByDay(pred), (day: any) => {
      day.events = cleanAll(_.map(day.events, (e: any) => {
        return e.event;
      }), cleanAnnouncement);
      day.date = day._id.day;
      day.day = moment(day.date).format("D");
      day.month = moment(day.date).format("MMMM");
      day.year = moment(day.date).format("YYYY");
      delete day._id;
      return day;
    })
    res.send(result);
  } catch (e) {
    next(e)
  }
});

//Get full details about a specific event
route.get('/:link', async (req: any, res: any, next: any) => {
  try {
    res.send(cleanAnnouncement(req.event, true))
  } catch (e) {
    next(e)
  }
});

//Create new event
route.post('/', userCan("create"), validate(CreateEventSchema), async (req: any, res: any, next: any) => {
  try {
    let event = req.body;
    event.link = base64url(crypto.randomBytes(4));
    event.createdBy = req.user._id;
    event.createdOn = Date.now();

    let object = new Event(event);
    await object.save();

    res.send({ link: event.link, message: "Successfully created event" })
  } catch (e) {
    next(e)
  }
});

//Update event
route.put('/:link', userCan("edit"), validate(UpdateEventSchema), async (req: any, res: any, next: any) => {
  try {
    req.body.lastUpdated = Date.now();
    req.body.updatedBy = req.user._id;

    await Event.findOneAndUpdate({ _id: req.event._id }, { $set: req.body })

    res.send({ message: "Event updated" })
  } catch (e) {
    next(e)
  }
});

//Delete event
route.delete('/:link', userCan("delete"), async (req: any, res: any, next: any) => {
  try {
    await Event.remove({ _id: req.event._id });

    res.send({ message: "Event deleted" })
  } catch (e) {
    next(e)
  }
});
