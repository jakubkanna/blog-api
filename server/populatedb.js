#! /usr/bin/env node

const genPassword = require("./lib/passwordUtils").genPassword;

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URI;

console.log("This script populates test post, admin, and guest user.");

main().catch((err) => console.log(err));

async function wipeDatabase() {
  const models = [User, Post, Comment];

  await Promise.all(models.map((model) => model.deleteMany()));

  console.log("Database wiped");
}

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await wipeDatabase();
  await createUsers();
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createUsers() {
  const { hash, salt } = genPassword("root");

  const admin = new User({
    email: "admin@example.com",
    hash: hash,
    salt: salt,
    role: "admin",
  });
  const guest = new User({
    email: "guest@example.com",
    hash: hash,
    salt: salt,
    role: "guest",
  });
  await User.insertMany([admin, guest]);
  console.log("Users created");
}

async function createPosts() {
  const admin = await User.findOne({ role: "admin" });
  const post = new Post({
    author: admin._id,
    title: "Sample Post",
    body: "This is a sample post body.",
  });
  await post.save();
  console.log("Post created");
}

async function createComments() {
  const guest = await User.findOne({ role: "guest" });
  const post = await Post.findOne({ title: "Sample Post" });
  const comment = new Comment({
    author: guest._id,
    post: post._id,
    text: "This is a sample comment.",
  });
  await comment.save();
  console.log("Comment created");
}
