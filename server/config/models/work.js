const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var WorkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  medium: [
    {
      type: String,
    },
  ],
  year: {
    type: Number,
    max: 9999,
  },
  images: [
    {
      type: String,
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  tags: { type: [String], default: [] },
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified: Date,
});

module.exports = mongoose.model("Work", WorkSchema);
