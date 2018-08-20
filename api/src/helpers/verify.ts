const assert = require('assert');

export function ensureAuthenticated(req: any, res : any, next : any) {
  userCan("login")(req, res, next);
}

export function ensureUnauthenticated (req: any, res: any, next: any) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user.permissionLevel >= 2) {
    next({
      status: 403,
      message: "Must be logged out"
    });
  } else {
    next();
  }
}

//minimum level for actions
export const USER_ACTIONS: any = {
  "login": 2,
  "view": 2,
  "create": 3,
  "edit": 3,
  "approve": 4,
  "delete": 4,
  "manageUsers": 5,
  "admin": 5
}

export function userCan(action: string) {
  let minLevel = USER_ACTIONS[action];
  assert(typeof minLevel !== 'undefined', `Invalid user action ${action}`);

  return function(req: any, res: any, next: any) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      next({
        status: 401,
        message: "Must be logged in"
      });
    } else if (!req.user.permissionLevel < minLevel) {
      next({
        status: 403,
        message: "Not allowed"
      });
    } else {
      next();
    }
  }
}
