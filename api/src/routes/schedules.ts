import * as express from "express";
export let route = express.Router();

import * as _ from "lodash";

import { Schedule, ScheduleSlot, ScheduleSlotRecurrence } from "../models";
import {
  CreateScheduleSchema,
  UpdateScheduleSchema
} from "../helpers/schema";

import { userCanSchedules, SCHEDULES_PERM_LEVELS } from "../helpers/verify";

const validate = require('express-validation');

route.param('scheduleId', async function (req : any, res, next, scheduleId) {
  var schedule = await Schedule.findOne({ _id: scheduleId });

  if (!schedule) {
    return next({
      status: 404,
      message: "Schedule not found"
    })
  }

  req.schedule = schedule;
  next();
});

//list all schedules (name, id)
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let schedules = await Schedule.find();
    res.send(schedules);
  } catch (e) {
    next(e)
  }
})

//list editable schedules
route.get('/editable', userCanSchedules(), async (req: any, res: any, next: any) => {
  try {
    if (req.schedulesLevel >= SCHEDULES_PERM_LEVELS["all"]) {
      //show all schedules
      let schedules = await Schedule.find()
      .sort({ name: 1 });
      return res.send(schedules)
    } else if (req.schedulesLevel >= SCHEDULES_PERM_LEVELS["own"]) {
      //show only schedules that the user belongs to
      //i.e. user must have a slot in the schedule
      let schedules = await ScheduleSlot.aggregate([
        { $match: { members: req.user._id }},
        { $group: { _id: "$schedule" }},
        { $lookup: { from: "schedules", localField: "_id", foreignField: "_id", as: "schedule" }},
        { $sort: { name: 1 }}
      ])

      return res.send(_.map(schedules, (s: any) => {
        return s.schedule
      }))
    } else {
      return next({ status: 500, message: "Invalid schedules level" })
    }
  } catch (e) {
    next(e)
  }
})

//list editable slots
route.get('/:scheduleId/slots/editable', userCanSchedules(), async (req: any, res: any, next: any) => {
  try {
    if (req.schedulesLevel >= SCHEDULES_PERM_LEVELS["all"]) {
      //return all slots
      let slots = await ScheduleSlot.find({ schedule: req.schedule._id })
      .sort({ title: 1 })

      return res.send(slots)
    } else if (req.schedulesLevel >= SCHEDULES_PERM_LEVELS["own"]) {
      //show only slots this user is in
      let slots = await ScheduleSlot.find({
        schedule: req.schedule._id,
        members: req.user._id
      })
      .sort({ title: 1 })

      return res.send(slots);
    } else {
      return next({ status: 500, message: "Invalid schedules level" })
    }
  } catch (e) {
    next(e)
  }
})

//get schedule for week (list of all occurances)
route.get('/:scheduleId/occurances/week/:week', async (req: any, res: any, next: any) => {

})

//list tutor schedules for week
route.get('/:scheduleId/slots/week/:week', async (req: any, res: any, next: any) => {

})

//create new schedule
route.post('/',  validate(CreateScheduleSchema), async (req: any, res: any, next: any) => {
  try {
    //check permissions (must be "all")
    const auth = req.user.group.permissions.admin ? "admin" : req.user.group.permissions.schedules;
    if (auth !== "admin") {
      return next({
        status: 403,
        message: "Not allowed to access this request"
      })
    }

    let _schedule = req.body;
    _schedule.dateCreated = Date.now();
    let schedule = new Schedule(_schedule);
    let savedSchedule = await schedule.save();

    res.send({ message: "Created schedule!", id: savedSchedule._id })

  } catch (e) {
    next(e)
  }
})

//update schedule
route.put('/:scheduleId', userCanSchedules("admin"), validate(UpdateScheduleSchema), async (req: any, res: any, next: any) => {
  try {
    req.body.lastUpdated = Date.now();

    await Schedule.findOneAndUpdate({ _id: req.schedule._id }, { $set: req.body });

    res.send({ message: "Schedule updated" })
  } catch (e) {
    next(e)
  }
})

//delete schedule
route.delete('/:scheduleId', userCanSchedules("admin"), async (req: any, res: any, next: any) => {
  try {
    //delete all slot recurrences
    await ScheduleSlotRecurrence.deleteMany({ schedule: req.schedule._id })

    //delete all slots
    await ScheduleSlot.deleteMany({ schedule: req.schedule._id })

    //delete schedule
    await Schedule.deleteOne({ _id: req.schedule._id })

    res.send({ message: "Schedule deleted" })
  } catch (e) {
    next(e)
  }
})

//create schedule slot
route.post('/:scheduleId/slot', userCanSchedules(), async (req: any, res: any, next: any) => {
  
})

//update schedule slot
route.put('/:scheduleId/slot/:slotId', async (req: any, res: any, next: any) => {

})

//delete schedule slot
route.delete('/:scheduleId/slot/:slotId', async (req: any, res: any, next: any) => {

})
