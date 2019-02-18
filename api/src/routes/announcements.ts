import * as express from "express";
import * as moment from "moment";
export let route = express.Router();

import { cleanAll, cleanAnnouncement } from "../helpers/clean";
import { userCan } from "../helpers/verify";
import { Announcement } from "../models";
import { CreateAnnouncementSchema, UpdateAnnouncementSchema } from "../helpers/schema";

const validate = require('express-validation');
const crypto = require('crypto');
const base64url = require('base64url');

route.param('link', async function (req : any, res, next, link) {
  var announcement = await Announcement.findOne({ link: link })
  .populate('createdBy')
  .populate('updatedBy');

  if (!announcement) {
    return next({
      status: 404,
      message: "Announcement not found"
    })
  }

  req.announcement = announcement;
  next();
});

//List all active announcements
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let _announcements = await Announcement
    .find({ visibleFrom: { $lt: moment().toDate() }, visibleUntil: { $gte: moment().toDate() }})
    .sort({ visibleFrom: -1 });

    res.send(cleanAll(_announcements, cleanAnnouncement));
  } catch (e) {
    next(e)
  }
});

//List all announcements (admin only)
route.get('/all', userCan("announcements"), async (req: any, res: any, next: any) => {
  try {
    let _announcements = await Announcement.find()
    .sort({ visibleFrom: -1 });

    res.send(cleanAll(_announcements, cleanAnnouncement));
  } catch (e) {
    next(e)
  }
});

//Get full text about a specific announcement
route.get('/:link', async (req: any, res: any, next: any) => {
  try {
    res.send(cleanAnnouncement(req.announcement, true))
  } catch (e) {
    next(e)
  }
});

//Create new announcement
route.post('/', userCan("announcements"), validate(CreateAnnouncementSchema), async (req: any, res: any, next: any) => {
  try {
    let announcement = req.body;
    announcement.link = base64url(crypto.randomBytes(4));
    announcement.createdBy = req.user._id;
    announcement.createdOn = Date.now();

    if (moment().isSameOrAfter(announcement.visibleUntil)) {
      return next({
        status: 400,
        message: "Some fields are invalid",
        errors: {
          visibleUntil: "Visible until date must be in the future"
        }
      })
    }

    let object = new Announcement(announcement);
    await object.save();

    res.send({ link: announcement.link, message: "Successfully created announcement" })
  } catch (e) {
    next(e)
  }
});

//Update announcement
route.put('/:link', userCan("announcements"), validate(UpdateAnnouncementSchema), async (req: any, res: any, next: any) => {
  try {
    req.body.lastUpdated = Date.now();
    req.body.updatedBy = req.user._id;

    await Announcement.findOneAndUpdate({ _id: req.announcement._id }, { $set: req.body })

    res.send({ message: "Announcement updated" })
  } catch (e) {
    next(e)
  }
});

//Delete announcement
route.delete('/:link', userCan("announcements"), async (req: any, res: any, next: any) => {
  try {
    await Announcement.remove({ _id: req.announcement._id });

    res.send({ message: "Announcement deleted" })
  } catch (e) {
    next(e)
  }
});
