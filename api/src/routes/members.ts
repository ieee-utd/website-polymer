import * as express from "express";

const crypto = require('crypto');
const validate = require('express-validation');
// const EasyPbkdf2 = require('easy-pbkdf2');
// const easyPbkdf2 = new EasyPbkdf2();
// const randomize = require('randomize');
const base64url = require('base64url');

import { cleanUser, cleanAll } from "../helpers/clean";
import { userCan } from "../helpers/verify";
import { sendConfirmAccountEmail } from "../helpers/mail";
import { CreateMemberUserSchema, UpdateMemberUserSchema } from "../helpers/schema";
import { Member, Group } from "../models";

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

  // const generatedPass = randomize('a0', 12);
  // const password = `${generatedPass.substring(0,5)}-${generatedPass.substring(5,3)}-${generatedPass.substring(8,4)}`;
  // console.log("Generated password", password);
  //
  // var salt = easyPbkdf2.generateSalt();
  // easyPbkdf2.secureHash(password, salt, async (err: any, hash: any, originalSalt: any) => {
  //   if (err) return next(err)

  try {

    //check group validity
    const group: any = await Group.findOne({ _id: req.body.group });
    if (!group || !group.permissions) {
      return next({
        message: "Invalid group",
        errors: {
          group: "Invalid group",
        },
        status: 400
      })
    }
    const shouldSendConfirmationEmail = group.permissions.login;

    let user: any = {
      firstName: req.body.firstName as string,
      lastName: req.body.lastName as string,
      email: req.body.email.toLowerCase().trim(),
      // passwordHash: hash,
      // passwordSalt: originalSalt,
      confirmationToken: shouldSendConfirmationEmail ? base64url(crypto.randomBytes(16)) : undefined,
      requirePasswordChange: true,
      group: req.body.group,

      memberSince: req.body.memberSince,
      bioMarkdown: req.body.bioMarkdown,
      position: req.body.position,
      dateCreated: Date.now()
    };

    //ensure that no duplicate user has registered
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

    let newUser = new Member(user);
    let savedUser = await newUser.save();

    if (shouldSendConfirmationEmail) {
      console.log(user.email)
      await sendConfirmAccountEmail(user.email, user.confirmationToken, user.firstName, user.lastName);
    }

    console.log("User registration token", user.confirmationToken)

    res.json({
      "message": "User successfully registered",
      id: savedUser._id
    });

  } catch (e) {
    next(e)
  }
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
