const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const {
  isLoggedIn,
  isCommentAuthorOrAdmin,
} = require("../middleware/authUtils");

// Unprotected routes
router.get("/", commentController.get_comments);
router.get("/:id", commentController.get_comment);

// Must be logged in
router.post(
  "/:slug/comments/create",
  isLoggedIn,
  commentController.create_comment
);

// Must be an author or admin, must be logged in
router.post(
  "/update/:id",
  isLoggedIn,
  isCommentAuthorOrAdmin,
  commentController.update_comment
);
router.post(
  "/delete/:id",
  isLoggedIn,
  isCommentAuthorOrAdmin,
  commentController.delete_comment
);

module.exports = router;
