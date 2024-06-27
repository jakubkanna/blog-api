var multer = require("multer");
var sharp = require("sharp");
var path = require("path");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Allowed file extensions are (jpeg, jpg, png, gif)");
  }
}

// Storage configuration for Multer
var storage = multer.memoryStorage(); // Store the file in memory temporarily

// Create Multer instance with configured storage and error handling
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file"); // assuming the field name for the file is 'file'

// Middleware to process image with Sharp
var processImage = function (req, res, next) {
  if (!req.file) {
    return next();
  }
  var filename = req.file.originalname.replace(/\s/g, "_");

  var outputPath = path.join(__dirname, "../public/images", filename);

  sharp(req.file.buffer)
    .metadata()
    .then(function (metadata) {
      var width = metadata.width;
      var height = metadata.height;
      var resizeOptions = {};

      if (width > height) {
        resizeOptions.width = 2160;
      } else {
        resizeOptions.height = 2160;
      }

      return sharp(req.file.buffer)
        .resize(resizeOptions)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(outputPath);
    })
    .then(function (info) {
      req.file.filename = filename;
      req.file.path = outputPath;
      req.file.size = info.size;
      next();
    })
    .catch(function (err) {
      next(err);
    });
};

module.exports = { upload, processImage: processImage };
