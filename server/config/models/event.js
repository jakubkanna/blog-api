// models/Event.js
var mongoose = require("mongoose");
var tagsValidator = require("./validators/tagsValidator");
var { singleURLValidator } = require("./validators/URL_Validator");

var Schema = mongoose.Schema;

const URLSchema = new Schema({
  url: { type: String, validate: singleURLValidator },
});

var EventSchema = new Schema({
  title: { type: String, required: [true, "Title is required."], minLength: 3 },
  subtitle: String,
  description: String,
  start_date: { type: Date },
  end_date: {
    type: Date,
    validate: {
      validator: function (value) {
        if (this.get("start_date") && value) {
          return value >= this.get("start_date");
        } else {
          return false;
        }
      },
      message: "End date must be equal to or later than start date.",
    },
  },
  venue: { type: String },
  tags: { type: [String], validate: tagsValidator, default: [] },
  images: { type: [Schema.Types.ObjectId], ref: "ImageInstance", default: [] },
  external_urls: [URLSchema],
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
