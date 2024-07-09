const express = require("express");
const router = express.Router();
const workController = require("../controllers/workController");
const { isLoggedIn, verifyRole } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", workController.get_works);
router.get("/:id/images", workController.get_images);

// Protected routes for work CRUD operations
router.post(
  "/create",
  isLoggedIn,
  verifyRole("admin"),
  workController.create_work
);
router.post(
  "/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  workController.update_work
);
router.post(
  "/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  workController.delete_work
);

module.exports = router;
