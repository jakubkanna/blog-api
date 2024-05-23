const asyncHandler = require("express-async-handler");
const Post = require("../config/models/post");

// CRUD for posts
const postController = {
  get_posts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.json(posts);
  }),

  get_post: asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  }),

  get_post_by_slug: asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  }),

  create_post: asyncHandler(async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(newPost);
  }),

  update_post: asyncHandler(async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  }),

  delete_post: asyncHandler(async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  }),
};

module.exports = postController;
