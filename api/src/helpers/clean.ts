var _ = require("lodash");
const assert = require('assert')

import { OFFICER_PERMISSION_LEVEL_NAMES } from "../models/members/Officer";

export function cleanAll(o: any, cleaner: any) {
  if (_.isPlainObject(o)) return cleaner(o);
  else if (_.isArray(o)) return _.map(o, cleaner);
  else return cleaner(o);
}

export function cleanArray(arr: any) {
  if (_.isArray(arr)) {
    return arr;
  } else if (_.isString(arr)) {
    return [ arr ];
  } else if (_.isPlainObject(arr)) {
    return [ arr ];
  } else {
    return [ ];
  }
}

export function cleanFromMongo(data: any) {
  if (!data) return data;
  let o = JSON.parse(JSON.stringify(data));

  delete o.__v;
  delete o.__t;
  return o;
}

export function arrayToValue(arr: any) {
  if (!_.isArray(arr)) return arr;
  if (arr.length == 0) return null;
  assert(arr.length == 1);
  return arr[0];
}

export function cleanUser(user: any, cleanExtra?: boolean) {
  if (!user) return user;
  let u = cleanFromMongo(user);

  u.permissionLevel = OFFICER_PERMISSION_LEVEL_NAMES[user.permissionLevel] + 1;
  delete u.passwordHash;
  delete u.passwordSalt;
  delete u.dateCreated;

  if (cleanExtra) {
    delete u.requirePasswordChange;
    delete u.permissionLevel;
    delete u.dateLastLogin;
    delete u.id;
  }

  return u;
}

export function cleanAnnouncement(_a: any, showAllContent?: boolean) {
  let a = cleanFromMongo(_a);

  if (a.content && !showAllContent) {
    a.content = a.content.length > 500 ? a.content.substring(0, 500).trim() : a.content.trim();
  }
  a.createdBy = cleanUser(a.createdBy, true);
  a.updatedBy = cleanUser(a.updatedBy, true);
  return a;
}
