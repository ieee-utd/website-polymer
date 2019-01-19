import * as mongoose from "mongoose";
var { AnnouncementBase } = require('./AnnouncementBase');
import { TIMEZONE } from "../../app";

var schema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  locationName: { type: String },
  locationUrl: { type: String },
  reservationUrl: { type: String },
  reservationRequired: { type: Boolean, default: false },
  recurrenceRule: { type: String, default: null },
}, {
  id: false,
  collection: "events"
});

schema.statics = {
  //timezone-sensitive list by day
  listByDay: function(match: any) {
    return this.aggregate()
    .match(match)
    //remove some fields
    .project({
      content: 0,
      __v: 0,
      _id: 0,
    })
    //sort by date - oldest first
    .sort({
      startTime: 1,
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

schema.index({ __t: 1, startTime: -1 });

export var Event = AnnouncementBase.discriminator('Event', schema);
