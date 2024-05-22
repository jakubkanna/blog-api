var express = require("express");
var router = express.Router();

// Define a route for the home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
