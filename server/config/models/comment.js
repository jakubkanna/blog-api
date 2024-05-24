// comment.js
const Post = require("./post");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, minlength: 1, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
