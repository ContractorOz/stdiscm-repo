function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

function alreadyLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
}

function userOnlyRoute(req, res, next) {
  const user = req.session.user;
  if (user && user.role === "moderator") {
    return res.redirect("/moderator");
  }

  next();
}

function moderatorOnlyRoute(req, res, next) {
  const user = req.session.user;
  if (user && user.role === "user") {
    return res.redirect("/");
  }

  next();
}

module.exports = {
  requireLogin,
  alreadyLoggedIn,
  userOnlyRoute,
  moderatorOnlyRoute,
};
