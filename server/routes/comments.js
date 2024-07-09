const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { jwtAuth, isCommentAuthorOrAdmin } = require("../middleware/authUtils");

// Unprotected
router.get("/", commentController.get_comments);
router.get("/:id", commentController.get_comment);

// Protected
router.post(
  "/:slug/comments/create",
  jwtAuth,
  commentController.create_comment
);
router.post("/update/:id", jwtAuth, commentController.update_comment);
router.post("/delete/:id", jwtAuth, commentController.delete_comment);

module.exports = router;
