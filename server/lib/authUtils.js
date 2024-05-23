const passport = require("passport");

// Authentication middleware for protected routes
const authMiddleware = (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    // Exclude "/login" and "/register" from authentication check
    return next();
  }
  passport.authenticate("jwt", { session: false })(req, res, next);
};

// Role verification middleware
function verifyRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}

module.exports = { authMiddleware, verifyRole };
