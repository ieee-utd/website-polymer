import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //basic
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },

  //timestamps
  dateCreated: { type: Date, required: true },
  memberSince: { type: Number, required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "members"
});

schema.index({ email: 1 });

export var Member = mongoose.model('Member', schema);
