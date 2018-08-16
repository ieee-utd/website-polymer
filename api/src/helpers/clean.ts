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
