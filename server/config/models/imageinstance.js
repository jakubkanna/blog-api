const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const validator = require("validator");

const imageURL_Validator = [
  validate({
    validator: function (url) {
      const options = {
        require_tld: false, // Allow URLs without TLD (e.g., localhost)
      };
      return validator.isURL(url, options);
    },
    message: "Must be a Valid URL.",
  }),
];

const Schema = mongoose.Schema;

const ImageInstanceShema = new Schema({
  url: { type: String, validate: imageURL_Validator, required: true },
  secure_url: { type: String, validate: imageURL_Validator, required: true },
  original_path: { type: String, required: true },
  original_filename: { type: String },
  filename: { type: String },
  format: { type: String },
  dimensions: { height: Number, width: Number },
  filename: { type: String },
  bytes: { type: Number, required: true },
  public_id: { type: String, unique: true },
  cld_url: { type: String, validate: imageURL_Validator },
  cld_secure_url: { type: String, validate: imageURL_Validator },
  alt: { type: String, default: "" },
  tags: { type: [String], default: [] },
  modified: { type: Date },
  timestamp: { type: Date, default: Date.now },
});

// Pre-save hook to derive fields from original_path
ImageInstanceShema.pre("save", function (next) {
  if (this.original_path) {
    const parts = this.original_path.split(".");
    const filenameParts = this.filename.split(".");

    this.original_filename = parts[0];
    this.format = parts[1];
    this.public_id = filenameParts[0];
  }
  next();
});

module.exports = mongoose.model("ImageInstance", ImageInstanceShema);
