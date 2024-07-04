const express = require("express");
const router = express.Router();
const imageinstanceController = require("../controllers/imageinstanceController");
const { isLoggedIn, verifyRole } = require("../middleware/authUtils");
const multerConfig = require("../middleware/multer");

// unprotected
router.get("/", imageinstanceController.get_images);
// Protected routes for image CRUD operations
router.post(
  "/destroy",
  isLoggedIn,
  verifyRole("admin"),
  imageinstanceController.delete_image
);
router.post(
  "/update/:public_id",
  isLoggedIn,
  verifyRole("admin"),
  multerConfig.upload,
  multerConfig.processImage,
  imageinstanceController.update_image
);
router.post(
  "/upload",
  isLoggedIn,
  verifyRole("admin"),
  multerConfig.upload,
  multerConfig.processImage,
  imageinstanceController.upload_image
);
router.post(
  "/create",
  isLoggedIn,
  verifyRole("admin"),
  imageinstanceController.create_image
);

module.exports = router;
