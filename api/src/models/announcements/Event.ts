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

schema.index({ __t: 1, startTime: -1 });

export var Event = AnnouncementBase.discriminator('Event', schema);
