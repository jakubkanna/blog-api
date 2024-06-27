const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { isLoggedIn, verifyRole } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", postController.get_posts);
router.get("/:idOrSlug", postController.get_post);

// Protected routes for post CRUD operations
router.post(
  "/create",
  isLoggedIn,
  verifyRole("admin"),
  postController.create_post
);
router.post(
  "/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.update_post
);
router.post(
  "/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.delete_post
);

module.exports = router;
