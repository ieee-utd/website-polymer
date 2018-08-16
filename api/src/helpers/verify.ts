export function ensureAuthenticated(req: any, res : any, next : any) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    next({
      status: 401,
      message: "Must be logged in"
    });
  } else {
    next();
  }
}

export function ensureUnauthenticated (req: any, res: any, next: any) {
    if (req.isAuthenticated && req.isAuthenticated()) {
    next({
      status: 403,
      message: "Must be logged out"
    });
  } else {
    next();
  }
}
