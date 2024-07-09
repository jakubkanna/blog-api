const mongoose = require("mongoose");
var { singleURLValidator } = require("./validators/URL_Validator");
const tagsValidator = require("./validators/tagsValidator");

const Schema = mongoose.Schema;

const ImageInstanceShema = new Schema({
  public_id: { type: String, unique: true },
  original_filename: { type: String },
  filename: { type: String },
  path: { type: String, required: true },
  format: { type: String },
  dimensions: { height: Number, width: Number },
  tags: { type: [String], validate: tagsValidator, default: [] },
  alt: { type: String, default: "" },
  bytes: { type: Number, required: true },
  url: { type: String, validate: singleURLValidator, required: true },
  secure_url: { type: String, validate: singleURLValidator },
  cld_url: { type: String, validate: singleURLValidator },
  cld_secure_url: { type: String, validate: singleURLValidator },
  modified: { type: Date },
  timestamp: { type: Date, default: Date.now },
});

// Pre-save hook to derive fields from original_path
ImageInstanceShema.pre("save", function (next) {
  if (this.original_path) {
    const parts = this.original_path.split(".");
    this.original_filename = parts[0];
    this.format = parts[1];
    this.public_id = this.filename;
  }
  next();
});

module.exports = mongoose.model("ImageInstance", ImageInstanceShema);
// Importing in another file
