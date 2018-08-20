import * as express from "express";
import * as moment from "moment";

const validate = require('express-validation')

import { cleanUser, cleanAll } from "../helpers/clean";
import { CreateOfficerUserSchema, UpdateOfficerUserSchema } from "../helpers/schema";
import { userCan } from "../helpers/verify";
const EasyPbkdf2 = require('easy-pbkdf2');
const easyPbkdf2 = new EasyPbkdf2();

import { Officer } from "../models";

export let route = express.Router();
//list officers (non-privileged)
route.get('/', async (req: any, res: any, next: any) => {
  let officers = await Officer.find();
  res.send(cleanAll(officers, cleanUser));
})

//list officers (admin)
route.get('/list', userCan("manageUsers"), async (req: any, res: any, next: any) => {
  let officers = await Officer.find();
  res.send(cleanAll(officers, cleanUser));
})

//create officer
route.post("/", userCan("manageUsers"), validate(CreateOfficerUserSchema), async(req: any, res: any, next: any) => {
  var salt = easyPbkdf2.generateSalt();
  easyPbkdf2.secureHash(req.body.password, salt, async (err: any, hash: any, originalSalt: any) => {
    if (err) return next(err)
    let user: any = {
      firstName: req.body.firstName as string,
      lastName: req.body.lastName as string,
      email: req.body.email.toLowerCase().trim(),
      passwordHash: hash,
      passwordSalt: originalSalt,
      requirePasswordChange: true,
      permissionLevel: req.body.permissionLevel,

      memberSince: req.body.memberSince || moment().year(),
      bioMarkdown: req.body.bioMarkdown || undefined,
      position: req.body.position || undefined,
      dateCreated: Date.now()
    };

    let userCheck = await Officer.findOne({ email: user.email });
    if (userCheck) {
      return next({
        message: "Email already registered",
        errors: {
          email: "Already taken"
        },
        status: 400
      })
    }

    try {
      let newUser = new Officer(user);
      let savedUser = await newUser.save();

      res.json({
        "message": "User successfully registered",
        id: savedUser._id
      });

    } catch (e) {
      next(e)
    }
  });
});

//update officer
route.put('/:userid', validate(UpdateOfficerUserSchema), userCan("manageUsers"), async (req: any, res: any, next: any) => {
  try {
    await Officer.findOneAndUpdate({ _id: req.params.userid }, { $set: req.body });

    res.send({ message: "Successfully updated user" })
  } catch (e) {
    next(e)
  }
})

//TODO enable, disable officers by converting them to members (or even to tutors)
