import * as express from "express";
import * as moment from "moment";
export let route = express.Router();

import { cleanAll, cleanAnnouncement } from "../helpers/clean";
import { userCan } from "../helpers/verify";
import { Event } from "../models";
import { CreateAnnouncementSchema } from "../helpers/schema";

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
    let _announcements = await Event
    .find({ endTime: { $gte: moment().add(1, 'day').toDate() }})
    .sort({ createdOn: -1 });

    res.send(cleanAll(_announcements, cleanAnnouncement));
  } catch (e) {
    next(e)
  }
});

//Get full details about a specific event
route.get('/:link', async (req: any, res: any, next: any) => {
  try {
    res.send(cleanAnnouncement(req.announcement, true))
  } catch (e) {
    next(e)
  }
});

//Create new event
route.post('/', userCan("create"), validate(CreateAnnouncementSchema), async (req: any, res: any, next: any) => {
  try {
    let event = req.body;
    event.link = base64url(crypto.randomBytes(8));
    event.createdBy = req.user._id;
    event.createdOn = Date.now();

    let object = new Event(event);
    await object.save();

    res.send({ link: event.link, message: "Successfully created announcement" })
  } catch (e) {
    next(e)
  }
});

//Update event
route.put('/:link', userCan("edit"), async (req: any, res: any, next: any) => {
  try {
    await Event.findOneAndUpdate({ _id: req.event._id }, req.body)

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
