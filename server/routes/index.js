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

router.use(passport.authenticate("jwt", { session: false }));

// Posts
router.get("/posts", postController.get_posts);

router.get("/posts/:id", postController.get_post);

router.get("/post/:slug", postController.get_post_by_slug);

// router.post("/create-post", postController.create_post);

// router.post("/update-post/:id", postController.update_post);

// router.post("/delete-post/:id", postController.delete_post);

// Comments

router.get("/posts/:id/comments", commentController.get_post_comments);

router.get("/comments/:id", commentController.get_comment);

//Users

router.get("/users", userController.get_users);

router.get("/users/:id", userController.get_user);

module.exports = router;
