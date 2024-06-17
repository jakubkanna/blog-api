const mongoose = require("mongoose");
require("mongoose-type-url");

const Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  place: { type: String },
  curators: [{ type: String }],
  tags: [
    {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.every(
            (tag) => typeof tag === "string" && tag === tag.toLowerCase()
          );
        },
        message: "Tags must be an array of lowercase strings",
      },
    },
  ],
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  external_url: { type: Schema.Types.Url },
  year: { type: Number, max: 9999 },
  public: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  modified_date: Date,
});

// Middleware to set the 'year' field based on 'start_date' before saving
EventSchema.pre("save", function (next) {
  if (this.start_date) {
    this.year = this.start_date.getFullYear();
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);
