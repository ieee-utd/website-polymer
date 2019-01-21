import * as mongoose from "mongoose";
import { TIMEZONE } from "../app";

var schema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  linkpart: { type: String, required: true }
}, {
  collection: "eventRecurrences",
  id: false
});

schema.statics = {
  //timezone-sensitive list by day
  listByDay: function(match: any) {
    return this.aggregate()
    .match(match)
    //remove some fields
    .project({
      __v: 0,
      _id: 0,
    })
    //sort by date - oldest first
    .sort({
      startTime: 1,
    })
    //inner join on announcements
    .lookup({
      from: "announcements",
      localField: "event",
      foreignField: "_id",
      as: "event"
    })
    //project date data
    .project({
      event: "$$ROOT",
      day: { $dateToString: {
        date: "$startTime",
        timezone: TIMEZONE,
        format: "%Y-%m-%d"
      }}
    })
    //group by day
    .group({
      _id: {
        day: "$day"
      },
      events: {
        $push: "$event"
      }
    })
    //sort by day (oldest first)
    .sort({
      "_id.day": 1
    })
  }
}

schema.index({ event: 1, linkpart: 1 })
schema.index({ startTime: 1, event: 1 })

export var EventRecurrence = mongoose.model('EventRecurrence', schema);
