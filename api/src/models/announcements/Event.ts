import * as mongoose from "mongoose";
var { AnnouncementBase } = require('./AnnouncementBase');

var schema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  locationName: { type: String },
  locationUrl: { type: String }
});

schema.index({ __t: 1, startTime: -1 });

export var Event = AnnouncementBase.discriminator('Event', schema);
