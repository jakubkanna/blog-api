const passport = require("passport");
const Comment = require("../config/models/comment");

const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  };
};

const isCommentAuthorOrAdmin = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (
    comment.author.toString() === req.user._id.toString() ||
    req.user.role === "admin"
  ) {
    return next();
  } else {
    return res
      .status(403)
      .json({
        message: "Forbidden: You are not authorized to update this comment",
      });
  }
};

module.exports = { isLoggedIn, verifyRole, isCommentAuthorOrAdmin };
