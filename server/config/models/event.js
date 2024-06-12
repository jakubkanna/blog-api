const mongoose = require("mongoose");
require("mongoose-type-url");

const Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  place: {
    type: String,
  },
  curators: [{ type: String }],
  tags: [{ type: String }],
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  external_url: { type: Schema.Types.Url },
  modified: Date,
});

module.exports = mongoose.model("Event", EventSchema);
