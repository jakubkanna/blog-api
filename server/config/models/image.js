const mongoose = require("mongoose");
var validate = require("mongoose-validator");
var validator = require("validator");

var imageURL_Validator = [
  validate({
    validator: function (url) {
      if (!validator.isURL(url)) {
        return false;
      }
      return true;
    },
    message: "Must be a Valid URL.",
  }),
];

const Schema = mongoose.Schema;

const Image = new Schema({
  public_id: String,
  url: { type: String, validate: imageURL_Validator, required: true },
  cdn_url: { type: String, validate: imageURL_Validator },
  alt: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  modified: { type: Date },
  tags: [String],
});

module.exports = mongoose.model("Image", Image);
