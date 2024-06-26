var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var validator = require("validator");

var urlValidator = [
  validate({
    validator: (value) => {
      if (!value) return true;

      validator.isURL(value);
    },
    message: "Must be a Valid URL.",
  }),
];

var tagsValidator = [
  validate({
    validator: function (tags) {
      // Check if all tags are lowercase strings
      const areLowercase = tags.every(
        (tag) => typeof tag === "string" && validator.isLowercase(tag)
      );

      // Check for duplicates in the tags array
      const uniqueTags = [...new Set(tags)];
      const areUnique = uniqueTags.length === tags.length;

      if (!areLowercase) {
        return false;
      }

      if (!areUnique) {
        return false;
      }

      // All conditions passed
      return true;
    },
    message:
      "Tags should be lowercase strings. Duplicated tags are not allowed.",
  }),
];

var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: { type: String, required: [true, "Title is required."], minLength: 3 },
  subtitle: String,
  description: String,
  start_date: { type: Date },
  end_date: {
    type: Date,
    validate: {
      validator: function (value) {
        // Only validate if start_date and end_date are defined
        if (this.start_date && value) {
          return value >= this.start_date;
        }
        return true;
      },
      message: "End date must be equal to or later than start date.",
    },
  },
  venue: { type: String },
  tags: { type: [String], validate: tagsValidator, default: [] },
  images: { type: [Schema.Types.ObjectId], ref: "Image" },
  external_url: { type: String, validate: urlValidator },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
