import * as express from "express";
export let route = express.Router();

import { cleanFromMongo } from "../helpers/clean";

route.get('/', (req: any, res: any, next: any) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    next({
      status: 401,
      message: "Not logged in"
    });
  } else {
    var user = JSON.parse(JSON.stringify(req.user));
    res.json(cleanFromMongo(user));
  }
});
