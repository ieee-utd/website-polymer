import * as mongoose from "mongoose";
import { Member } from './Member';

var schema = new mongoose.Schema({
  //blurb
  profileImageUrl: { type: String },
  bioMarkdown: { type: String },
  position: { type: String },

}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});

schema.index({ email: 1 });

export var Tutor = Member.discriminator('Tutor', schema);
