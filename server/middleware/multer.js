// config/multer.js

const multer = require("multer");

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Destination directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storing the file
  },
});

// File size limit (10MB)
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("File type not supported"), false); // Reject the file
  }
};

// Create Multer instance with configured storage and error handling
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
