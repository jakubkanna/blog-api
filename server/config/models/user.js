// user.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  hash: String,
  salt: String,
  role: {
    type: String,
    enum: ["admin", "guest"],
    default: "guest",
  },
});

module.exports = mongoose.model("User", UserSchema);
