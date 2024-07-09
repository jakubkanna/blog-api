const express = require("express");
const router = express.Router();
const imageinstanceController = require("../controllers/imageinstanceController");
const { jwtAuth } = require("../middleware/authUtils");
const multerConfig = require("../middleware/multer");

// unprotected
router.get("/", imageinstanceController.get_images);
// Protected routes for image CRUD operations
router.post("/destroy", jwtAuth, imageinstanceController.delete_image);
router.post(
  "/update/:public_id",
  jwtAuth,
  multerConfig.upload,
  multerConfig.processImage,
  imageinstanceController.update_image
);
router.post(
  "/upload",
  jwtAuth,
  multerConfig.upload,
  multerConfig.processImage,
  imageinstanceController.upload_image
);
router.post("/create", jwtAuth, imageinstanceController.create_image);

module.exports = router;
