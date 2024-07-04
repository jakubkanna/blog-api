var validate = require("mongoose-validator");
var validator = require("validator");

var URL_Validator = [
  validate({
    validator: function (url) {
      console.log("validate url:", url);
      const options = {
        protocols: ["http", "https"], // Only allow http and https protocols
        require_protocol: true, // Require the protocol (e.g., http://)
        require_valid_protocol: true, // Only validate URLs with valid protocols
        require_host: true, // Require the host in the URL
        require_tld: false, // Require top-level domain (e.g., .com, .org)
      };
      const isValid = validator.isURL(url, options);
      console.log("is valid URL:", isValid);
      return isValid;
    },
    message: "Must be a Valid URL.",
  }),
];

module.exports = URL_Validator;
