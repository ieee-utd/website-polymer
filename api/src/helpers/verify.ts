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

export const SCHEDULES_PERM_LEVELS: any = {
  null: 0,        //no access
  "own": 1,       //edit own only (no create)
  "all": 2,       //create and edit slots in all schedules
  "admin": 3      //all + create, edit, and delete schedules
}

export function userCanSchedules(level?: string) {
  if (!level) { level = "own" }
  let levelInt = SCHEDULES_PERM_LEVELS[level];
  assert(typeof levelInt === 'number');

  return function(req: any, res: any, next: any) {
    userCan("schedules")(req, res, (e: any) => {
      if (e) return next(e);

      const auth = req.user.group.permissions.schedules;
      const authInt = SCHEDULES_PERM_LEVELS[auth];
      req.schedulesLevel = auth;
      req.schedulesLevelInt = authInt;
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
