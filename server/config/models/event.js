var mongoose = require("mongoose");
var tagsValidator = require("./validators/tagsValidator");
var URL_Validator = require("./validators/URL_Validator");

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
  images: { type: [Schema.Types.ObjectId], ref: "ImageInstance" },
  external_urls: [{ type: String, validate: URL_Validator, default: [] }],
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
