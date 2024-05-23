#! /usr/bin/env node
require("dotenv").config();
var genPassword = require("./lib/passwordUtils").genPassword;

var User = require("./config/models/user");
var Post = require("./config/models/post");
var Comment = require("./config/models/comment");
var mongoose = require("mongoose");

var mongoDB = process.env.DB_STRING;

console.log("This script populates test post, admin, and guest user.");

main().catch((err) => console.log(err));

async function wipeDatabase() {
  var models = [User, Post, Comment];

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
  var { hash, salt } = genPassword("root");
  const issueJWT = require("../lib/jwtUtils").issueJWT;

  var admin = new User({
    email: "admin@example.com",
    username: "admin",
    hash: hash,
    salt: salt,
    role: "admin",
  });
  var guest = new User({
    email: "guest@example.com",
    username: "guest",
    hash: hash,
    salt: salt,
    role: "guest",
  });
  await User.insertMany([admin, guest]);
  issueJWT(admin);
  issueJWT(guest);
  console.log("Users created");
}

async function createPosts() {
  var admin = await User.findOne({ role: "admin" });

  var postsData = [
    { title: "Post 1", body: "Body of Post 1" },
    { title: "Post 2", body: "Body of Post 2" },
    { title: "Post 3", body: "Body of Post 3" },
  ];

  await Promise.all(
    postsData.map(async (postData) => {
      var post = new Post({
        author: admin._id,
        title: postData.title,
        body: postData.body,
      });
      await post.save();
    })
  );

  console.log("Posts created");
}

async function createComments() {
  var guest = await User.findOne({ role: "guest" });
  var posts = await Post.find();

  // Define the number of comments for each post
  var commentsPerPost = [1, 2, 0];

  await Promise.all(
    posts.map(async (post, index) => {
      // Get the number of comments for the current post
      var numComments = commentsPerPost[index];

      // Create the specified number of comments for the post
      for (let i = 0; i < numComments; i++) {
        var comment = new Comment({
          author: guest._id,
          post: post._id,
          text: `This is comment number ${i + 1} for ${post.title}`,
        });
        await comment.save();
      }
    })
  );

  console.log("Comments created");
}
