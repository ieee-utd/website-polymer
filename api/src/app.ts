//force pwetty colors
process.env.FORCE_COLOR = "1";

import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as passport from "passport";
import * as session from "express-session";

const EasyPbkdf2 = require('easy-pbkdf2');
const easyPbkdf2 = new EasyPbkdf2();

//database
import * as mongoose from "mongoose";
// mongoose.set('debug', true);
const MongoStore = require('connect-mongo')(session);

const chalk = require('chalk');
const _ = require('lodash');
const util = require('util');

console.log(chalk.gray("==========================================="));
console.log(chalk.gray(`IEEEUTD API Starting`));

const fs = require('fs');
if (fs.existsSync('.env')) {
  console.log(chalk.green("Loading environment variables from .env"));
  require('dotenv').config();
}

//failure handling
const unhandledRejection = require("unhandled-rejection");
let rejectionEmitter = unhandledRejection({
    timeout: 15
});
rejectionEmitter.on("unhandledRejection", (error: any, promise: any) => {
  console.error("Unhandled promise rejection", promise);
});

//Prepare connection details
const dbPath = (process.env.NODE_ENV === "test") ? "/ieeeutd-test" : "/ieeeutd";
const DATABASE_URI = "mongodb://" + process.env.DATABASE_PORT_27017_TCP_ADDR + ":27017" + dbPath;
import { REDIS_HOST } from "./helpers/cache";

if (process.env.NODE_ENV !== "script") {
  console.log(chalk.green("Database: ", DATABASE_URI));
  console.log(chalk.green("Cache   : ", REDIS_HOST));
} else {
  console.log(chalk.yellow("Not connecting to database in script mode"))
}

//Connect to database
export const db = mongoose.connection;
if (process.env.NODE_ENV !== "script") {
  mongoose.connect(DATABASE_URI, { config: { autoIndex: true }, useNewUrlParser: true })
  .then(async () => {
    //perform one-time database init here
  })
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  })
}

//prepare timezone
export const TIMEZONE = "America/Chicago";

//init app
export let app = express();

let sessionStore = new MongoStore({
  mongooseConnection: db,
  touchAfter: 5 * 60, //cookie refresh interval - 5 minutes
  ttl: 2 * 60 * 60, //2 hours
  stringify: false //allow search
});

//middleware

function headersSent (res: any) {
  return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent
}

const developmentFormatLine: any = function(tokens: any, req: any, res: any) {
  // get the status code if response written
  var status: any = headersSent(res)
    ? res.statusCode
    : undefined

  // get status color
  var color: any = status >= 500 ? 31 // red
    : status >= 400 ? 33 // yellow
      : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
          : 0 // no color

  // get colored function
  var fn: any = developmentFormatLine[color];

  if (!fn) {
    // compile
    fn = developmentFormatLine[color] = morgan.compile('\x1b[0m:date[iso] :method :url \x1b[' +
      color + 'm:status \x1b[0m:response-time ms - :res[content-length]\x1b[0m')
  }

  return fn(tokens, req, res)
};
morgan.format('devtime', developmentFormatLine);

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  saveUninitialized: false,
  rolling: true,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000 //2 hours
    // secure: true, //enable if HTTPS
  },
  store: sessionStore,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

import { Strategy } from "passport-local";
import { Member } from "./models";
passport.use('local', new Strategy( { usernameField: "email", passwordField: "password" }, async (email: any, password: any, done: any) => {
  let user: any = await Member.findOne({ email: email.toLowerCase().trim() })
  .populate('group');

  if (user) {
    console.log("Logging in as: " + user.email);

    easyPbkdf2.verify(user.passwordSalt, user.passwordHash, password, (err: any, valid: any) => {
      if (valid) {
        if (!user.group || !user.group.permissions || !user.group.permissions.login) {
          return done({
            status: 401,
            message: "Account disabled"
          })
        } else if (!user.passwordHash || !user.passwordSalt) {
          return done({
            status: 401,
            message: "Please check your email to verify your account",
          });
        } else if (user.requirePasswordChange) {
          return done({
            status: 401,
            message: "Password change required",
            action: "setPassword"
          });
        } else {
          return done(null, user);
        }
      } else {
        return done(null, false);
      }
    })
  } else {
    return done(null, false);
  }
}));

passport.serializeUser(async (user: any, done: any) => {
  done(null, {
    _id: user._id,
    email: user.email
  });
});

passport.deserializeUser(async (serializedUser: any, done: any) => {
  var user: any = await Member.findById(serializedUser._id)
  .select("firstName lastName email _id group profileImageUrl position")
  .populate('group');

  console.log("Acting as: " + user.email);

  done(null, user);
});

//load api routes
import { routes } from "./routes/index";
if (process.env.NODE_ENV !== "script") {
  app.use('/api', routes);
}

// Handle validation errors
const validate = require('express-validation');
import { sendMongooseValidationError, getErrorForm, getJoiErrorForm } from "./helpers/errors";
app.use((err : any, req : any, res : any, next : any) => {
  if (err instanceof mongoose.Error) {
    //Mongoose validation error
    res.status(400).json({
      "message": "Some fields are incorrect",
      "errors": sendMongooseValidationError(err)
    });
  } else if (err instanceof validate.ValidationError || (err["name"] && err["name"] === "ValidationError")) {
    console.error(err);
    if (err.errors) {
      //using Camo
      console.error(err.errors)
      res.status(400).json({
        "message": "Some fields are incorrect",
        "errors": getErrorForm(err.errors)
      })
    } else if (err.details) {
      //directly from Validator.validate
      res.status(400).json({
        "message": "Some fields are incorrect",
        "errors": getJoiErrorForm(err.details)
      })
    } else {
      res.status(400).json({
        "message": "Some fields are incorrect",
        "errors": { }
      })
    }
  } else {
    next(err);
  }
});

//handle 200
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.status && err.status == 200) {
    delete err.status;
    res.send(err);
  } else {
    next(err);
  }
})

// Handle other errors
app.use((err : any, req : any, res : any, next : any) => {
  if (!err) {
    err = { }
  }
  else if (err.status && err.status != 500) {
    console.error(err);
    res.status(err.status);
  } else {
    console.error(err);
    res.status(500);
    err.status = 500;
    err.detail = err.detail || err.stack;
    err.message = "An internal error occurred";
  }
  res.json({
    "message": err.message || "An unknown error occurred",
    "status": err.status || err.errorCode,
    "detail": err.detail || "",
    "errors": err.errors || undefined,
    "action": err.action || undefined
  });
});

//Handle 404s
app.use(function (req: any, res: any, next: any) {
  res.status(404).send({ message: "Endpoint does not exist"})
})

//open server
if (process.env.NODE_ENV !== "script") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(chalk.green.bold("RUNNING on port " + (process.env.PORT || 3000)))

    console.log(chalk.gray("==========================================="));

    //rewrite log statements to include file and line numbers
    ['log', 'warn', 'error', 'trace'].forEach((methodName: any) => {
      const originalMethod: any = (console as any)[methodName];
      (console as any)[methodName] = (...args: any[]) => {
        let initiator = 'unknown';
        try {
          throw new Error();
        } catch (e) {
          if (typeof e.stack === 'string') {
            let isFirst = true;
            for (const line of e.stack.split('\n')) {
              const matches = line.match(/^\s+at\s+(.*)/);
              if (matches) {
                if (!isFirst) { // first line - current function
                                // second line - caller (what we are looking for)
                  initiator = matches[1];
                  initiator = initiator.split('/')[0] + _.join(initiator.split('/').splice(3), '/');
                  break;
                }
                isFirst = false;
              }
            }
          }
        }
        var color = (a: any) => { return a };
        if (methodName == "warn") color = chalk.yellow;
        if (methodName == "error") color = chalk.red;
        for (var i=0; i<args.length; i++) {
          if (_.isPlainObject(args[i]))
            args[i] = JSON.stringify(args[i], null, 2)
          else if (!_.isString(args[i]))
            args[i] = util.inspect(args[i]);

          args[i] = color(args[i]);
        }
        originalMethod.apply(console, [...args, chalk.gray(`at ${initiator}`)]);
      };
    });
  });
}
