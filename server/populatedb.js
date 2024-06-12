#! /usr/bin/env node
require("dotenv").config();
const faker = require("faker");
const genPassword = require("./lib/passwordUtils").genPassword;

const User = require("./config/models/user");
const Post = require("./config/models/post");
const Comment = require("./config/models/comment");
const Event = require("./config/models/event");

const mongoose = require("mongoose");

const mongoDB = process.env.DB_STRING;

console.log(
  "This script populates posts, admin and guest user, comments, events."
);

main().catch((err) => console.log(err));

async function wipeDatabase() {
  const models = [User, Post, Comment, Event];

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
  await createEvents();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createUsers() {
  const { hash, salt } = genPassword("root");

  const admin = new User({
    email: "admin@example.com",
    username: "admin",
    hash: hash,
    salt: salt,
    role: "admin",
  });
  const guest = new User({
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
  const admin = await User.findOne({ role: "admin" });

  const postsCount = faker.datatype.number({ min: 1, max: 3 });
  const postsData = Array.from({ length: postsCount }).map(() => ({
    title: faker.lorem.sentence(),
    data: JSON.stringify({
      blocks: Array.from({
        length: faker.datatype.number({ min: 1, max: 5 }),
      }).map(() => ({
        content: faker.lorem.paragraph(),
      })),
    }),
  }));

  await Promise.all(
    postsData.map(async (postData) => {
      const post = new Post({
        author: admin._id,
        title: postData.title,
        data: postData.data,
      });
      await post.save();
    })
  );

  console.log("Posts created");
}

async function createComments() {
  const guest = await User.findOne({ role: "guest" });
  const posts = await Post.find();

  const commentsPerPost = posts.map(() =>
    faker.datatype.number({ min: 0, max: 3 })
  );

  await Promise.all(
    posts.map(async (post, index) => {
      const numComments = commentsPerPost[index];

      for (let i = 0; i < numComments; i++) {
        const comment = new Comment({
          author: guest._id,
          post: post._id,
          text: faker.lorem.sentence(),
        });
        await comment.save();
      }
    })
  );

  console.log("Comments created");
}

async function createEvents() {
  const eventsData = makeData(faker.datatype.number({ min: 1, max: 3 }));

  await Promise.all(
    eventsData.map(async (event) => {
      // Create event and its sub-events recursively
      await createEvent(event);
    })
  );

  console.log("Events created");
}

async function createEvent(event) {
  // Convert curator names to string
  const curators = event.curators;

  // Create tags
  const tags = await createTags(faker.datatype.number({ min: 1, max: 3 }));

  // Create the event
  const newEvent = new Event({
    title: event.title,
    start_date: event.start_date,
    end_date: event.end_date,
    place: event.place,
    curators: curators.map(
      (curator) => `${curator.firstName} ${curator.lastName}`
    ),
    post: event.post,
    tags: [...tags],
  });

  await newEvent.save();

  // If the event has sub-events, create them recursively
  if (event.subRows) {
    await Promise.all(
      event.subRows.map(async (subEvent) => {
        await createEvent(subEvent);
      })
    );
  }
}

async function createTags(count) {
  const tags = [];

  for (let i = 0; i < count; i++) {
    const tagName = faker.random.word();
    tags.push(tagName);
  }

  return tags;
}

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newEvent(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

function range(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

const newEvent = () => {
  const randomNum = faker.datatype.number({ min: 1, max: 3 });
  const curators = Array.from({ length: randomNum }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }));
  return {
    title: faker.lorem.sentence(),
    start_date: faker.date.future().toISOString().substring(0, 10),
    end_date: faker.date.future().toISOString().substring(0, 10),
    place: faker.address.city(),
    tags: [],
    curators: curators,
  };
};
