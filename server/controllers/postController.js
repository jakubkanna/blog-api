const asyncHandler = require("express-async-handler");
const Post = require("../config/models/post");

// CRUD for posts
const postController = {
  get_posts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.json(posts);
  }),

  get_post: asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  }),

  //   create_post: asyncHandler(async (req, res) => {
  //     const newPost = new Post(req.body);
  //     const savedPost = await newPost.save();
  //     res.status(201).json(savedPost);
  //   }),

  //   update_post: asyncHandler(async (req, res) => {
  //     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
  //       new: true,
  //     });
  //     if (!updatedPost) {
  //       return res.status(404).json({ message: "Post not found" });
  //     }
  //     res.json(updatedPost);
  //   }),

  //   delete_post: asyncHandler(async (req, res) => {
  //     const deletedPost = await Post.findByIdAndDelete(req.params.id);
  //     if (!deletedPost) {
  //       return res.status(404).json({ message: "Post not found" });
  //     }
  //     res.json({ message: "Post deleted successfully" });
  //   }),
};

module.exports = postController;
