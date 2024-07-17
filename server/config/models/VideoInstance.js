const mongoose = require("mongoose");
var { singleURLValidator } = require("./validators/URL_Validator");
const tagsValidator = require("./validators/tagsValidator");

const Schema = mongoose.Schema;

const VideoInstanceSchema = new Schema({
  type: { type: String, default: "video", enum: ["video"] },

  youtube_url: { type: String, validator: singleURLValidator },

  tags: { type: [String], validate: tagsValidator, default: [] },
  timestamp: { type: Date, default: Date.now },
  modified: { type: Date },
});

module.exports = mongoose.model("ImageInstance", VideoInstanceSchema);
