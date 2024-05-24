const asyncHandler = require("express-async-handler");
const Comment = require("../config/models/comment");
const Post = require("../config/models/post");

// CRUD for comments
const commentController = {
  get_post_comments: asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: post._id }).populate(
      "author",
      "username"
    );
    if (!comments || comments.length === 0) {
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

  create_comment: asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      ...req.body,
      post: post._id,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  }),

  update_comment: asyncHandler(async (req, res) => {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedComment);
  }),

  delete_comment: asyncHandler(async (req, res) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  }),
};

module.exports = commentController;
