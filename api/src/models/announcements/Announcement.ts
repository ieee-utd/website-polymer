import * as mongoose from "mongoose";
import { AnnouncementBase } from "./AnnouncementBase";

var schema = new mongoose.Schema({

});

schema.index({ __t: 1, link: 1 });

export var Announcement = AnnouncementBase.discriminator('Announcement', schema);
