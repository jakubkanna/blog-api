const asyncHandler = require("express-async-handler");
const Comment = require("../config/models/comment");
const Post = require("../config/models/post");

// CRUD for comments
const commentController = {
  get_post_comments: asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: post._id });
    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.json(comments);
  }),
  get_comment: asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  }),
};

module.exports = commentController;
