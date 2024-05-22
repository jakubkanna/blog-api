var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

// Posts
router.get("/posts", postController.get_posts);

router.get("/post/:slug", postController.get_post);

// router.post("/create-post", postController.create_post);

// router.post("/update-post/:id", postController.update_post);

// router.post("/delete-post/:id", postController.delete_post);

module.exports = router;
