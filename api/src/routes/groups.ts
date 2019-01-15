import * as express from "express";

import { userCan } from "../helpers/verify";
import { Group } from "../models";

export let route = express.Router();

//list groups
route.get('/', userCan("members"), async (req: any, res: any, next: any) => {
  let results = await Group.find().sort({ name: 1 })
  res.send(results);
})
