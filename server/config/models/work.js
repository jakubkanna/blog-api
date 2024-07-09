const mongoose = require("mongoose");
const tagsValidator = require("./validators/tagsValidator");

const Schema = mongoose.Schema;

var WorkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  medium: [
    {
      type: String,
      default: "",
    },
  ],
  year: {
    type: Number,
    max: 9999,
  },
  images: { type: [Schema.Types.ObjectId], ref: "ImageInstance", default: [] },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  tags: { type: [String], validate: tagsValidator, default: [] },
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified: Date,
});

module.exports = mongoose.model("Work", WorkSchema);
