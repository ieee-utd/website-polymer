import * as mongoose from "mongoose";
var { AnnouncementBase } = require('./AnnouncementBase');

var schema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  locationName: { type: String },
  locationUrl: { type: String },
  reservationUrl: { type: String },
  reservationRequired: { type: Boolean, default: false }
});

schema.statics = {
  listByDay: function(match: any) {
    return this.aggregate()
    .match(match)
    //remove some fields
    .project({
      content: 0,
      __v: 0,
      _id: 0,
    })
    //project date data
    .project({
      event: "$$ROOT",
      date: "$startTime"
    })
    //sort by date - oldest first
    .sort({
      date: 1,
    })
    //extract day
    .project({
      event: "$$ROOT",
      day : { $substr: ["$date", 0, 10] } //first 10 characters of date mm-dd-yyyy
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
