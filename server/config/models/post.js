//post.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlockSchema = new mongoose.Schema({
  id: { type: String },
  content: { type: String, default: "" },
  index: { type: Number, unique: true, min: 0 },
});

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  title: {
    type: String,
    default: "Untitled",
    minlength: 1,
    maxlength: 100,
  },
  content: { type: [BlockSchema] },
  public: { type: Boolean, default: true },
  slug: { type: String, unique: true },
  tags: { type: [String], default: [] },
  modified: { type: Date },
});

// generate the slug
PostSchema.pre("save", async function (next) {
  const formattedTitle = this.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  //every time formatted title is found, update add it's number on the end
  let slug = formattedTitle;
  let num = 2;
  let post = await this.constructor.findOne({ slug });

  while (post) {
    slug = `${formattedTitle}-${num}`;
    post = await this.constructor.findOne({ slug });
    num++;
  }

  this.slug = slug;

  next();
});

module.exports = mongoose.model("Post", PostSchema);
