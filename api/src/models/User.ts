import * as mongoose from "mongoose";

var schema = new mongoose.Schema({
  //basic
	firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },

  //security
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  
  //timestamps
  dateCreated: { type: Date, required: true },
  dateLastLogin: { type: Date },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});

export var User = mongoose.model('User', schema);
