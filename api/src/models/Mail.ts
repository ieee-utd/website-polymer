import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //use one of the following:
  sendTo: [new mongoose.Schema({
    email: { type: String, required: true },
    deliveryStatus: { type: String }
  })],

  //logging
  emailList: { type: mongoose.Schema.Types.ObjectId, ref: "MailList" },
  dateRequested: { type: Date, required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member" }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "mail",
  id: false
});

export var Mail = mongoose.model('Mail', schema);
