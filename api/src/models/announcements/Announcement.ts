import * as mongoose from "mongoose";
import { AnnouncementBase } from "./AnnouncementBase";

var schema = new mongoose.Schema({
  visibleFrom: { type: Date, required: true },
  visibleUntil: { type: Date, required: true },
}, {
  id: false
});

schema.index({ __t: 1, link: 1 });
schema.index({ __t: 1, visibleFrom: 1, visibleUntil: 1 });

export var Announcement = AnnouncementBase.discriminator('Announcement', schema);
