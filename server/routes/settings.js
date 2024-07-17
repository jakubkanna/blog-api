const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingsController");
const { jwtAuth } = require("../middleware/authUtils");

// Protected routes
router.get("/", jwtAuth, settingController.get_settings);
router.post("/update/:id", jwtAuth, settingController.update_post);

module.exports = router;
