const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const { isLoggedIn, verifyRole } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", tagController.get_tags);

module.exports = router;
