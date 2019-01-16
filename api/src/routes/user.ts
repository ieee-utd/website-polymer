import * as express from "express";
import * as passport from "passport";

const validate = require('express-validation')
const EasyPbkdf2 = require('easy-pbkdf2');
const easyPbkdf2 = new EasyPbkdf2();
const base64url = require('base64url');
const crypto = require('crypto');

import { cleanFromMongo } from "../helpers/clean";
import { LoginSchema, SetInitialPasswordSchema, ChangePasswordSchema, RequestPasswordResetSchema } from "../helpers/schema";
import { ensureAuthenticated, ensureUnauthenticated } from "../helpers/verify";
import { sendResetPasswordEmail } from "../helpers/mail";

import { Member } from "../models";
import { db } from "../app";

export let route = express.Router();

//get current login state
route.get('/', ensureAuthenticated, (req: any, res: any, next: any) => {
  var user = JSON.parse(JSON.stringify(req.user));
  res.json(cleanFromMongo(user));
});

//login
route.post("/login", ensureUnauthenticated, validate(LoginSchema), async(req: any, res: any, next: any) => {
  //Trap passport's authentication to avoid revealing whether user account exists - and to provide better errors
  passport.authenticate('local', async (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    var userSession = JSON.parse(JSON.stringify(user));

    //complete login
    req.logIn(userSession, async function(err: any) {
      if (err) return next(err);

      console.log(userSession._id)
      await Member.findOneAndUpdate({ _id: userSession._id }, { $set: { dateLastLogin: Date.now() }});

      res.send({ message: "Successfully logged in" })
    });
  })(req, res, next);
});

//logout
route.post("/logout", async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(201).json({ "message": "Not logged in" });
  }

  req.logout();
  return res.json({ "message": "Successfully logged out" });
})

//set password and confirm account, if not already confirmed
route.post("/confirm/:token", ensureUnauthenticated, validate(SetInitialPasswordSchema), async (req: any, res: any, next: any) => {
  var user: any = await Member.findOne({ email: req.body.email.toLowerCase().trim() });

  if (!user) {
    return next({ status: 400, message: "Email not correct or token expired. Please try resetting your password again from the login page and make sure you are using the correct email." });
  }
  if (!user.confirmationToken || user.confirmationToken !== req.params.token) {
    return next({ status: 400, message: "Email not correct or token expired. Please try resetting your password again from the login page and make sure you are using the correct email." })
  }
  // if (!user.requirePasswordChange) {
  //   return next({ status: 403, message: "User does not require a password change" });
  // }

  var salt = easyPbkdf2.generateSalt();
  easyPbkdf2.secureHash(req.body.password, salt, async (err: any, hash: any, originalSalt: any) => {
    if (err) {
      return next(err)
    }

    await Member.findOneAndUpdate({ _id: user._id }, { $set: {
      requirePasswordChange: false,
      confirmationToken: null,
      passwordSalt: originalSalt,
      passwordHash: hash
    } });

    res.send({ message: "Successfully confirmed account" });
  })
})

route.post("/requestPasswordReset", ensureUnauthenticated, validate(RequestPasswordResetSchema), async (req: any, res: any, next: any) => {
  try {
    var user: any = await Member.findOne({ email: req.body.email.toLowerCase().trim() })
    .populate('group');

    if (!user) {
      return next({ status: 400, message: "Account not found or disabled" });
    }
    if (!user.group.permissions.login) {
      return next({ status: 400, message: "Account not found or disabled" });
    }

    const token = base64url(crypto.randomBytes(16));

    await Member.findOneAndUpdate({ _id: user._id }, { $set: {
      confirmationToken: token
    }})

    await sendResetPasswordEmail(user.email, token, user.firstName, user.lastName);

    res.send({ message: "Password reset email sent"})
  } catch (e) {
    next(e)
  }
})

//change your password
route.post("/changePassword", ensureAuthenticated, validate(ChangePasswordSchema), async (req: any, res: any, next: any) => {

  var user: any = await Member.findOne({ _id: req.user._id });
  if (!user) {
    return next({ status: 401, message: "Account disabled" });
  }

  easyPbkdf2.verify(user.passwordSalt, user.passwordHash, req.body.password, (err: any, valid: any) => {
    if (!valid) {
      next({ status: 400, message: "Current password is incorrect" }); return;
    } else if (req.body.password == req.body.newPassword) {
      next({ status: 400, message: "New password must not equal current password" });
      return;
    }

    var salt = easyPbkdf2.generateSalt();
    easyPbkdf2.secureHash(req.body.newPassword, salt, async (err: any, hash: any, originalSalt: any) => {
      if (err) return next(err);

      await Member.findOneAndUpdate({ _id: user._id }, { $set: {
        passwordSalt: originalSalt,
        passwordHash: hash
      } });

      //log out of all other sessions
      await db.collection("sessions").remove({ "session.passport.user._id": req.user._id.toString(), "_id": { $ne: req.session.id } });

      res.send({ message: "Successfully set new password" });
    });
  })
})
