import * as mongoose from "mongoose";
import { Member } from './Member';

export const OFFICER_PERMISSION_LEVELS = {
  "Basic": 1, //no API access, just listed on officer page
  "Viewer": 2, //can login, allowed to view content
  "Editor": 3, //can create/add/remove
  "Approver": 4, //can approve changes
  "Admin": 5, //API overlord
}
export const OFFICER_PERMISSION_LEVEL_NAMES = Object.keys(OFFICER_PERMISSION_LEVELS);

var schema = new mongoose.Schema({
  //blurb
  profileImageUrl: { type: String },
  bioMarkdown: { type: String },
  position: { type: String },

  //security
  passwordHash: { type: String },
  passwordSalt: { type: String },
  permissionLevel: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
  requirePasswordChange: { type: Boolean, value: false },

  //timestamps
  dateLastLogin: { type: Date },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});

schema.index({ email: 1 });

export var Officer = Member.discriminator('Officer', schema);
