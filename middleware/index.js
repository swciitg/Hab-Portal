// exports.isLoggedIn = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   req.flash("info", "You need to login first!");
//   return res.redirect("/hab/admin/login");
// };

// exports.isAdmin = function (req, res, next) {
//   if (req.user.isAdmin) {
//     return next();
//   }
//   req.flash("info", "You are unauthorized!");
//   //req.logout();
//   return res.redirect("/hab/admin");
// };

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("info", "You need to login first!");
  return res.redirect("/hab/admin/login");
};

exports.isAdmin = function (req, res, next) {
  if (req.user.isAdmin) {
    return next();
  } else {
    //req.logout();
    return res.redirect("/hab/admin/hostel");
  }
};

exports.isHostelAdmin = function (req, res, next) {
  if (req.user.isHostelAdmin) {
    return next();
  } else {
    req.flash("info", "You are unauthorized!");
    //req.logout();
    return res.redirect("/hab/admin");
  }
};

exports.adminDecider = function (req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  if (req.user.isHostelAdmin) {
    return res.redirect("/hab/admin/hostel");
  } else {
    return next();
  }
};
