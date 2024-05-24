//post.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  title: {
    type: String,
    default: "Untitled",
    minlength: 1,
    maxlength: 100,
  },
  body: { type: String, minlength: 1, required: true },
  public: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

// generate the slug
PostSchema.pre("save", function (next) {
  const formattedTitle = this.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  this.slug = formattedTitle;

  next();
});

module.exports = mongoose.model("Post", PostSchema);
