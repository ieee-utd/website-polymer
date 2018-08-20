import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  leaders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  //members includes both non-leadership officers and other members
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }]
}, {
  collection: "committees"
});

export var Committee = mongoose.model('Committee', schema);
