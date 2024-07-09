const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { jwtAuth } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", eventController.get_events);
router.get("/:id", eventController.get_event);
router.get("/:id/images", eventController.get_images);

// Protected routes for event CRUD operations
router.post("/create", jwtAuth, eventController.create_event);
router.post("/update/:id", jwtAuth, eventController.update_event);
router.post("/delete/:id", jwtAuth, eventController.delete_event);
module.exports = router;
