import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //basic
  name: { type: String, required: true },
  role: { type: String, required: true, enum: [ "Member", "Tutor", "Officer", "Leader", "Advisor", "Alumnus" ] },
  permissions: {
    login: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
    members: { type: Boolean, default: false },
    editOwnProfile: { type: Boolean, default: false },
    schedules: { type: String, enum: [ null, "own", "section", "all" ], default: null },
    events: { type: String, enum: [ null, "own", "all" ], default: null }, //own allows creating, but not viewing others'
    announcements: { type: String, enum: [ null, "own", "all" ], default: null }, //own allows creating, but not viewing others'
    admin: { type: Boolean, default: false }
  },

  //timestamps
  dateCreated: { type: Date, required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: "groups",
  id: false
});

export var Group = mongoose.model('Group', schema);
