import * as assert from "assert";

import { Announcement, Event } from "../models";
import { cleanFromMongo, cleanAll } from "../helpers/clean";

function Model(_type: string) {
  let type = _type.toLowerCase();
  if (type === "announcement" || type === "announcements") return Announcement;
  if (type === "event" || type === "events") return Event;
  assert(false, "Model type not found");
}

export async function listAll(type: string) {
  try {
    return cleanAll(await Model(type).find({ }), cleanFromMongo);
  } catch (e) {
    return Promise.reject(e);
  }
}
