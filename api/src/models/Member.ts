import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //basic
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  //blurb
  profileImageUrl: { type: String },
  bioMarkdown: { type: String },
  position: { type: String },

  //security
  passwordHash: { type: String },
  passwordSalt: { type: String },
  confirmationToken: { type: String },
  requirePasswordChange: { type: Boolean, value: false },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },

  //timestamps
  dateCreated: { type: Date, required: true },
  memberSince: { type: Number, required: true },
  dateLastLogin: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "members",
  id: false
});

schema.virtual('initials').get(function() {
  return this.firstName.substring(0, 1).toUpperCase() + this.lastName.substring(0, 1).toUpperCase();
})

schema.index({ email: 1 });

export var Member = mongoose.model('Member', schema);
