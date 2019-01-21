var _ = require("lodash");
const assert = require('assert')

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

  delete u.passwordHash;
  delete u.passwordSalt;
  delete u.confirmationToken;

  if (cleanExtra) {
    delete u.requirePasswordChange;
    delete u.dateLastLogin;
    delete u.dateCreated;
  }

  return u;
}

export function cleanAnnouncement(_a: any, showAllContent?: boolean) {
  let a = cleanFromMongo(_a);

  //clean recurrence rule
  if (a.event && a.event.length == 1) {
    a = Object.assign(a.event[0], {
      startTime: a.startTime,
      endTime: a.endTime,
      link: a.event[0].link + "/" + a.linkpart
    });
  }

  if (a.content && !showAllContent) {
    a.content = a.content.length > 500 ? a.content.substring(0, 500).trim() : a.content.trim();
  }
  if (_.isPlainObject(a.createdBy)) {
    a.createdBy = cleanUser(a.createdBy, true);
  } else {
    delete a.createdBy;
  }
  if (_.isPlainObject(a.updatedBy)) {
    a.updatedBy = cleanUser(a.updatedBy, true);
  } else {
    delete a.updatedBy;
  }

  return a;
}
