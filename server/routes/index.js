var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");
var userController = require("../controllers/userController");
var userController = require("../controllers/userController");
var eventController = require("../controllers/eventController");
var workController = require("../controllers/workController");
var tagController = require("../controllers/tagController");
var imageController = require("../controllers/imageController");
const upload = require("../middleware/multer");

var isLoggedIn = require("../middleware/authUtils").isLoggedIn;
var verifyRole = require("../middleware/authUtils").verifyRole;
var isCommentAuthorOrAdmin =
  require("../middleware/authUtils").isCommentAuthorOrAdmin;

// Unprotected routes
router.post("/login", userController.post_login);
router.post("/register", userController.post_register);

router.get("/posts", postController.get_posts);
router.get("/posts/:idOrSlug", postController.get_post);

router.get("/comments", commentController.get_comments);
router.get("/posts/:slug/comments", commentController.get_post_comments);
router.get("/comments/:id", commentController.get_comment);

router.get("/events/", eventController.get_events);
router.get("/works/", workController.get_works);

router.get("/tags/", tagController.get_tags);

// Posts
// Protected routes for post CRUD operations
// Must be admin, must be logged in
router.post(
  "/posts/create",
  isLoggedIn,
  verifyRole("admin"),
  postController.create_post
);
router.post(
  "/events/create",
  isLoggedIn,
  verifyRole("admin"),
  eventController.create_event
);
router.post(
  "/works/create",
  isLoggedIn,
  verifyRole("admin"),
  workController.create_work
);
router.post(
  "/posts/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.update_post
);
router.post(
  "/works/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  workController.update_work
);
router.post(
  "/events/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  eventController.update_event
);
router.post(
  "/posts/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  postController.delete_post
);
router.post(
  "/events/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  eventController.delete_event
);

router.post(
  "/works/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  workController.delete_work
);

router.post(
  "/images/delete/:id",
  isLoggedIn,
  verifyRole("admin"),
  imageController.delete_image
);
router.post(
  "/images/update/:id",
  isLoggedIn,
  verifyRole("admin"),
  imageController.update_image
);

router.post(
  "/images/create",
  isLoggedIn,
  verifyRole("admin"),
  upload.single("file"),
  imageController.create_image
);

router.post(
  "/images",
  isLoggedIn,
  verifyRole("admin"),
  imageController.get_images
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
// router.get("/users", isLoggedIn, verifyRole("admin"), userController.get_users);
// router.get(
//   "/users/:id",
//   isLoggedIn,
//   verifyRole("admin"),
//   userController.get_user
// );
// router.get(
//   "/users/current",
//   isLoggedIn,
//   verifyRole("admin"),
//   userController.get_user_current
// );

module.exports = router;
