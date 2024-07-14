const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingsController");

// Unprotected routes
router.get("/general", settingController.get_settings);

module.exports = router;
