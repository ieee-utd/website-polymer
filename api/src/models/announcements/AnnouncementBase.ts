import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  link: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  contentMarkdown: { type: String, required: true },
}, {
  collection: "announcements"
});

schema.index({ link: 1 });

export var AnnouncementBase = mongoose.model('AnnouncementBase', schema);
