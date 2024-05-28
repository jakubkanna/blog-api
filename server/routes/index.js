var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");
var userController = require("../controllers/userController");
var passport = require("passport");
var isLoggedIn = require("../lib/authUtils").isLoggedIn;
var verifyRole = require("../lib/authUtils").verifyRole;
var isCommentAuthorOrAdmin = require("../lib/authUtils").isCommentAuthorOrAdmin;

// Define unprotected routes
router.post("/login", userController.post_login);
router.post("/register", userController.post_register);

router.get("/posts", postController.get_posts);
router.get("/posts/:slug", postController.get_post);
router.get("/posts/:slug/comments", commentController.get_post_comments);
router.get("/comments/:id", commentController.get_comment);

// Posts
// Protected routes for post CRUD operations
// Must be admin, must be logged in
router.post(
  "/posts/create-post",
  isLoggedIn,
  verifyRole("admin"),
  postController.create_post
);
router.post(
  "/posts/update-post/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.update_post
);
router.post(
  "/posts/delete-post/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.delete_post
);

// Comments

// Must be logged in
router.post(
  "/:slug/comments/create",
  isLoggedIn,
  commentController.create_comment
);
router.get("/users/current", isLoggedIn, userController.get_user_current);

// Must be an author or admin, must be logged in
router.post(
  "/comments/update/:id",
  isLoggedIn,
  isCommentAuthorOrAdmin,
  commentController.update_comment
);
router.post(
  "/comments/delete/:id",
  isLoggedIn,
  isCommentAuthorOrAdmin,
  commentController.delete_comment
);

// Users
// Must be an admin, must be logged in
router.get("/users", isLoggedIn, verifyRole("admin"), userController.get_users);
router.get(
  "/users/:id",
  isLoggedIn,
  verifyRole("admin"),
  userController.get_user
);

module.exports = router;
