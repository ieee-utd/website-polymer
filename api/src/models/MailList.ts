import * as mongoose from "mongoose";

var schema = new mongoose.Schema({

  name: { type: String, required: true },

  subscriptions: [new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },

    //logging
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member" }
  }, {
    id: false,
    _id: false
  })],

  //logging
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  createdOn: { type: Date, required: true }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "mailList",
  id: false
});

export var Mail = mongoose.model('Mail', schema);
