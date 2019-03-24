import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //basic
  // link: { type: String, required: true },
  title: { type: String, required: true }, //title is automatically computed during creation (based on member names)
  notes: { type: String },
  location: { type: String },
  locationUrl: { type: String },
  color: { type: String, required: true }, //auto-generated

  //list of dates/times that a person attends
  instances: [{
    //first day and recurrence rule

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    recurrenceRule: { type: String, default: null }, //each rule is a set of dates that the
  }],
  instanceExceptions: [{ type: Date }],

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
