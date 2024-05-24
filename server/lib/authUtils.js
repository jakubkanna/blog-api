const passport = require("passport");

// Authentication middleware for protected routes
const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

function verifyRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}

function isCommentAuthor() {
  return (req, res, next) => {
    req.comment.author === req.user._id ? next() : res.sendStatus(403);
  };
}

module.exports = { isLoggedIn, verifyRole, isCommentAuthor };
