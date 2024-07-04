var validate = require("mongoose-validator");
var validator = require("validator");

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
module.exports = tagsValidator;
