var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");

// Posts
router.get("/posts", postController.get_posts);

router.get("/post/:id", postController.get_post);

// router.post("/create-post", postController.create_post);

// router.post("/update-post/:id", postController.update_post);

// router.post("/delete-post/:id", postController.delete_post);

// Comments

router.get("/post/:id/comments", commentController.get_post_comments);

router.get("/comment/:id", commentController.get_comment);

module.exports = router;
