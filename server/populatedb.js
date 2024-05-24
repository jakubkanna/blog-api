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

  console.log("Users created");
}

async function createPosts() {
  var admin = await User.findOne({ role: "admin" });

  var postsData = [
    {
      title: "The Mystery of the Locked Room",
      body: "Detective Smith entered the room, greeted by an eerie silence. All the doors were locked from the inside, and the only window was too small for a person to pass through. Yet, in the center of the room, lay the lifeless body of Mr. Johnson. Who could have committed the crime? Smith knew he had to unravel the mystery of the locked room.",
    },
    {
      title: "The Haunted House on Hilltop Lane",
      body: "Legend had it that the old mansion on Hilltop Lane was haunted by the ghost of a forlorn widow. No one dared to venture near it after dusk, except for young Sarah. One stormy night, Sarah decided to uncover the truth behind the ghostly tales. As she stepped into the creaking mansion, she felt a chill down her spine. Little did she know, the secrets of the haunted house would change her life forever.",
    },
    {
      title: "The Lost Treasure of Captain Blackbeard",
      body: "For centuries, tales of Captain Blackbeard's lost treasure had captivated the minds of treasure hunters. Many had tried and failed to find the elusive bounty. But one fateful day, a group of daring adventurers stumbled upon a map that claimed to lead to the treasure. Their journey was fraught with danger and betrayal, but they pressed on, determined to uncover the riches that lay hidden beneath the sands.",
    },
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
