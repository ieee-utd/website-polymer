import * as express from "express";
import * as passport from "passport";

const validate = require('express-validation')

import { cleanFromMongo } from "../helpers/clean";
import { LoginSchema, SetInitialPasswordSchema, ChangePasswordSchema} from "../helpers/schema";
import { ensureAuthenticated, ensureUnauthenticated } from "../helpers/verify";
const EasyPbkdf2 = require('easy-pbkdf2');
const easyPbkdf2 = new EasyPbkdf2();

import { Officer } from "../models";
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

      await Officer.findOneAndUpdate({ _id: userSession._id }, { $set: { dateLastLogin: Date.now() }});

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

//set initial password
route.post("/setInitialPassword", ensureUnauthenticated, validate(SetInitialPasswordSchema), async (req: any, res: any, next: any) => {

  //typically one would use 'passport.authenticate' here, but it just didn't work... at all
  var user: any = await Officer.findOne({ email: req.body.email });

  if (!user) {
    return next({ status: 401, message: "Account disabled" });
  }

  easyPbkdf2.verify(user.passwordSalt, user.passwordHash, req.body.password, (err: any, valid: any) => {
    if (!valid) {
      next({ status: 401, message: "Current password is incorrect" }); return;
    } else if (!user.requirePasswordChange) {
      next({ status: 401, message: "User does not require a password change" });
      return;
    } else if (req.body.password == req.body.newPassword) {
      next({ status: 401, message: "New password must not equal current password" });
      return;
    }

    var salt = easyPbkdf2.generateSalt();
    easyPbkdf2.secureHash(req.body.newPassword, salt, async (err: any, hash: any, originalSalt: any) => {
      if (err) {
        return next(err)
      }

      await Officer.findOneAndUpdate({ _id: user._id }, { $set: {
        requirePasswordChange: false,
        passwordSalt: originalSalt,
        passwordHash: hash
      } });

      res.send({ message: "Successfully set new password" });
    });
  })
})

//change your password
route.post("/changePassword", ensureAuthenticated, validate(ChangePasswordSchema), async (req: any, res: any, next: any) => {

  var user: any = await Officer.findOne({ _id: req.user._id });
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

      await Officer.findOneAndUpdate({ _id: user._id }, { $set: {
        passwordSalt: originalSalt,
        passwordHash: hash
      } });

      //log out of all other sessions
      await db.collection("sessions").remove({ "session.passport.user._id": req.user._id.toString(), "_id": { $ne: req.session.id } });

      res.send({ message: "Successfully set new password" });
    });
  })
})
