import * as express from "express";
export let route = express.Router();

import { userCan } from "../helpers/verify";
import { Announcement } from "../models";
import * as helper from "../helpers/announcements.helper";

route.param('link', async function (req : any, res, next, link) {
  var announcement = await Announcement.findOne({ link: link });
  if (!announcement) {
    return next({
      status: 404,
      message: "Announcement not found"
    })
  }

  req.announcement = announcement;
  next();
});

//List all announcements
route.get('/', async (req: any, res: any, next: any) => {
  return await helper.listAll("announcements");
});

//Get a specific announcement
route.get('/:link', async (req: any, res: any, next: any) => {

});

//Create new announcement
route.post('/', userCan("create"), async (req: any, res: any, next: any) => {

});

//Update announcement
route.put('/:link', userCan("edit"), async (req: any, res: any, next: any) => {

});

//Delete announcement
route.delete('/:link', userCan("delete"), async (req: any, res: any, next: any) => {

});
