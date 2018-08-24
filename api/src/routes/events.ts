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

//List all active events
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let _events = await Event
    .find({
      startTime: { $lte: moment().add(30, 'days').toDate() },
      endTime: { $gte: moment().day(0).startOf('day').toDate() }
    })
    .sort({ startTime: -1 });

    let events = cleanAll(_events, cleanAnnouncement);

    let result: any = { };
    let firstDayOfNextWeek = moment().day(7).startOf('day');

    result.thisWeek = _.filter(events, (e: any) => {
      return moment(e.endTime).isBefore(firstDayOfNextWeek);
    })
    result.upcoming = _.filter(events, (e: any) => {
      return moment(e.endTime).isSameOrAfter(firstDayOfNextWeek);
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
    event.link = base64url(crypto.randomBytes(6));
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
