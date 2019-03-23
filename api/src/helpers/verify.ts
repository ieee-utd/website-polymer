import * as assert from "assert";

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

export function userCan(action: string) {
  return function(req: any, res: any, next: any) {
    // console.log(req.user)
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      next({
        status: 401,
        message: "Must be logged in"
      });
    } else if (!req.user.group.permissions || ((!req.user.group.permissions["login"] || !req.user.group.permissions[action]) && !req.user.group.permissions.admin)) {
      next({
        status: 403,
        message: "Not allowed to access this request"
      });
    } else {
      next();
    }
  }
}

const SCHEDULES_PERM_LEVELS: any = {
  null: 0,
  "own": 1,
  "section": 2,
  "all": 3,
  "admin": 4
}

export function userCanSchedules(level: string) {
  let levelInt = SCHEDULES_PERM_LEVELS[level];
  assert(typeof levelInt === 'number');

  return function(req: any, res: any, next: any) {
    userCan("schedules")(req, res, (e: any) => {
      if (e) return next(e);

      const auth = req.user.group.permissions.schedules
      const authInt = SCHEDULES_PERM_LEVELS[auth];
      if (typeof authInt !== 'number') {
        return next({
          status: 500,
          mesasge: "Invalid auth level for schedule permission: " + auth
        })
      }

      next();
    })
  }
}
