import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule", required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "ScheduleSlot", required: true },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  
  linkpart: { type: String, required: true }
}, {
  collection: "scheduleSlotRecurrences",
  id: false
});

schema.index({ schedule: 1, slot: 1, linkpart: 1 })

export var ScheduleSlotRecurrence = mongoose.model('ScheduleSlotRecurrence', schema);
