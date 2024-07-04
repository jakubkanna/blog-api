const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { isLoggedIn, verifyRole } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", eventController.get_events);
router.get("/:id/images", eventController.get_images);

// Protected routes for event CRUD operations
router.post(
  "/create",
  isLoggedIn,
  verifyRole("admin"),
  eventController.create_event
);
router.post(
  "/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  eventController.update_event
);
router.post(
  "/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  eventController.delete_event
);
module.exports = router;
