import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  link: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],

  //authorship
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  createdOn: { type: Date, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  lastUpdated: { type: Date }
}, {
  collection: "announcements",
  id: false
});

schema.index({ link: 1 });

export var AnnouncementBase = mongoose.model('AnnouncementBase', schema);
