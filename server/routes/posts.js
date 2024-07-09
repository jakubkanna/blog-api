const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { jwtAuth, verifyRole } = require("../middleware/authUtils");

// Unprotected routes
router.get("/", postController.get_posts);
router.get("/:idOrSlug", postController.get_post);

// Protected routes for post CRUD operations
router.post("/create", jwtAuth, postController.create_post);
router.post("/update/:id", jwtAuth, postController.update_post);
router.post("/delete/:id", jwtAuth, postController.delete_post);

module.exports = router;
