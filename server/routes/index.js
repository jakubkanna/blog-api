var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");
var userController = require("../controllers/userController");
var verifyRole = require("../lib/verifyUtils").verifyRole;
var passport = require("passport");

// Define unprotected routes
router.post("/login", userController.post_login);
router.post("/register", userController.post_register);

// Authentication middleware for protected routes
router.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/register") return next(); // Exclude "/login" and "/register" from authentication check
  passport.authenticate("jwt", { session: false })(req, res, next);
});

// Posts
router.get("/posts", postController.get_posts);
router.get("/posts/:id", postController.get_post);
router.get("/posts/:id/comments", commentController.get_post_comments);
router.get("/posts/:slug", postController.get_post_by_slug);

// Protected routes for post CRUD operations
router.post(
  "/posts/create-post",
  verifyRole("admin"),
  postController.create_post
);
router.post(
  "/posts/update-post/:id",
  verifyRole("admin"),
  postController.update_post
);
router.post(
  "/posts/delete-post/:id",
  verifyRole("admin"),
  postController.delete_post
);

// Comments
router.get("/comments/:id", commentController.get_comment);
router.get("/comments/:id", commentController.get_comment);
router.post("/comments/create-comment", commentController.create_comment);
router.post(
  "/comments/update-comment/:id",
  verifyRole("guest"),
  commentController.update_comment
);
router.post(
  "/comments/delete-comment/:id",
  verifyRole("guest"),
  commentController.delete_comment
);

// Users
router.get("/users", verifyRole("admin"), userController.get_users);
router.get("/users/:id", verifyRole("admin"), userController.get_user);

module.exports = router;
