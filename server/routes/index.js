var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");
var userController = require("../controllers/userController");

// Posts
router.get("/posts", postController.get_posts);

router.get("/posts/:id", postController.get_post);

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
