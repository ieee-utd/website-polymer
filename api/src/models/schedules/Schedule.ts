import * as mongoose from "mongoose";

//Schedule e.g. ENA or S&S
//contains a list of Slots

var schema = new mongoose.Schema({
  //basic
  name: { type: String, required: true }, //i.e. class name (such as "Eletronic Network Analysis")
  shortName: { type: String, required: true }, //e.g. "ENA"

  //public
  public: { type: Boolean, default: true, required: true }, //is visible to everyone?

  //timestamps
  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "schedules",
  id: false
});

export var Schedule = mongoose.model('Schedule', schema);
