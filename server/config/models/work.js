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
    required: true,
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
});

module.exports = mongoose.model("Work", WorkSchema);
