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
