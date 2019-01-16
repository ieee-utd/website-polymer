import * as express from "express";
import * as fs from "fs";
import { route as userRoute } from "./user";
import { route as announcementsRoute } from "./announcements"
import { route as membersRoute } from "./members";
import { route as eventsRoute } from "./events";
import { route as groupsRoute } from "./groups";
import { cache, cacheMiddleware } from "../helpers/cache";

export let routes = express.Router();

var gitSHA = "unknown";
if (fs.existsSync("BLOB_ID")) {
  gitSHA = fs.readFileSync("BLOB_ID", 'utf8').toString().trim().slice(0, 7);
}
if (gitSHA == "unknown")
try {
  gitSHA = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim().slice(0, 7);
} catch (e) { }

cache.clear("init")

/** Human-readable index **/
routes.get('/', async (req: any, res: any) => {
  res.send("Welcome to the IEEEUTD API!");
});

/** Machine-readable version string **/
routes.get('/version', cacheMiddleware('1 hour'), async (req: any, res: any) => {
  req.apicacheGroup = "init";
  res.json({ versionString: process.env.IEEEUTD_API_VERSION || "dev-build", revision: gitSHA });
});

routes.use("/user", userRoute);
routes.use("/members", membersRoute);
routes.use("/groups", groupsRoute);
routes.use("/announcements", announcementsRoute);
routes.use("/events", eventsRoute);
