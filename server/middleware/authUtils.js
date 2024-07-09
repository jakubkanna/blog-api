const passport = require("passport");

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err || !user) {
      next(info);
    } else {
      console.log(user);
      req.user = user;
      next();
    }
  })(req, res, next);
};

module.exports = { jwtAuth };
