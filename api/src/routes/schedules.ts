import * as express from "express";
export let route = express.Router();

import { Schedule } from "../models";
import {
  CreateScheduleSchema,
  UpdateScheduleSchema
} from "../helpers/schema";

import { userCanSchedules } from "../helpers/verify";

const validate = require('express-validation');

//list all schedules (name, id)
route.get('/', async (req: any, res: any, next: any) => {
  try {
    let schedules = await Schedule.find();
    res.send(schedules);
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
route.put('/', userCanSchedules("admin"), validate(UpdateScheduleSchema), async (req: any, res: any, next: any) => {
  try {

  } catch (e) {
    next(e)
  }
})

//delete schedule
route.delete('/:scheduleId', userCanSchedules("admin"), async (req: any, res: any, next: any) => {

})
