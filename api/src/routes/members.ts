import * as express from "express";
import * as moment from "moment";

const validate = require('express-validation')

import { cleanUser, cleanAll } from "../helpers/clean";
import { CreateMemberUserSchema, UpdateMemberUserSchema } from "../helpers/schema";
import { userCan } from "../helpers/verify";
const EasyPbkdf2 = require('easy-pbkdf2');
const easyPbkdf2 = new EasyPbkdf2();

import { Member } from "../models";

export let route = express.Router();
//list members (non-privileged)
route.get('/', async (req: any, res: any, next: any) => {
  let officers = await Member.find();
  res.send(cleanAll(officers, cleanUser));
})

//list members (admin)
route.get('/list', userCan("members"), async (req: any, res: any, next: any) => {
  let officers = await Member.find();
  res.send(cleanAll(officers, cleanUser));
})

//create member
route.post("/", userCan("members"), validate(CreateMemberUserSchema), async(req: any, res: any, next: any) => {
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

    let userCheck = await Member.findOne({ email: user.email });
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
      let newUser = new Member(user);
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

//update member
route.put('/:userid', validate(UpdateMemberUserSchema), userCan("members"), async (req: any, res: any, next: any) => {
  try {
    await Member.findOneAndUpdate({ _id: req.params.userid }, { $set: req.body });

    res.send({ message: "Successfully updated user" })
  } catch (e) {
    next(e)
  }
})
