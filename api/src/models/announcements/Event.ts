import * as mongoose from "mongoose";
import * as moment from "moment-timezone";
var { AnnouncementBase } = require('./AnnouncementBase');

var schema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  locationName: { type: String },
  locationUrl: { type: String },
  reservationUrl: { type: String },
  reservationRequired: { type: Boolean, default: false }
});

function calculateTimeOffset() {
  let offsetMins = -moment.tz("America/Chicago").utcOffset();
  console.log("Time offset (minutes):", offsetMins);
  return offsetMins;
}
const offsetMinutes = calculateTimeOffset();

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
      date: { $add: ["$startTime", offsetMinutes*60*1000] }
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
