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

//user must be able to access members list
route.use(userCan("members"));

//list members (admin)
route.get('/', async (req: any, res: any, next: any) => {
  let members = await Member.find().populate('group');
  res.send(cleanAll(members, cleanUser));
})

//create member
route.post("/", validate(CreateMemberUserSchema), async(req: any, res: any, next: any) => {
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

route.param('userid', async (req: any, res: any, next: any, id: any) => {
  try {
    req.member = await Member.findOne({ _id: id })
    .populate('group');

    if (!req.member) return next({ status: 404, message: "Member not found" })
    next();
  } catch (e) {
    next(e)
  }
})

//get member details
route.get('/:userid', async (req: any, res: any, next: any) => {
  res.send(cleanUser(req.member));
})

//update member
route.put('/:userid', validate(UpdateMemberUserSchema), async (req: any, res: any, next: any) => {
  try {
    await Member.findOneAndUpdate({ _id: req.params.userid }, { $set: req.body });

    res.send({ message: "Successfully updated user" })
  } catch (e) {
    next(e)
  }
})
