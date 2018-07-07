import * as express from "express";

//force pwetty colors
process.env.FORCE_COLOR = "1";

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
  console.trace(error);
  console.error("Promise rejection", promise);
});

var app = express();

app.get('/api', (req: any, res: any) => {
  res.send("Hello world!")
})

//Handle 404s
app.use(function (req: any, res: any, next: any) {
  res.status(404).send({ message: "Endpoint does not exist"})
})

//open server
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
        if (!_.isString(args[i]))
          args[i] = util.inspect(args[i]);
        args[i] = color(args[i]);
      }
      originalMethod.apply(console, [...args, chalk.gray(`at ${initiator}`)]);
    };
  });
});
