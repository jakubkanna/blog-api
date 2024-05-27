const passport = require("passport");
const Comment = require("../config/models/comment");

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

const isCommentAuthor = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author.toString() === req.user._id.toString()) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden: You are not the author of this comment" });
  }
};

module.exports = { isLoggedIn, verifyRole, isCommentAuthor };
