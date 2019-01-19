import * as mongoose from "mongoose";


var schema = new mongoose.Schema({
  //basic
  link: { type: String, required: true },
  title: { type: String, required: true }, //defaults to user's name
  notes: { type: String },

  //first day and recurrence rule
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  recurrenceRule: { type: String, default: null },

  //schedule
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule", required: true },

  //members added to this slot
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],

  //timestamps
  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "scheduleSlots",
  id: false
});

schema.index({ link: 1 });
schema.index({ schedule: 1 });

export var ScheduleSlot = mongoose.model('ScheduleSlot', schema);
