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
    /*
    null = no access
    own = edit own only (no create)
    section = create and edit slots any in single schedule
    all = create and edit slots in any schedule
    admin = all + create, edit, and delete schedules
    */
    schedules: { type: String, enum: [ null, "own", "section", "all", "admin" ], default: null },
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
