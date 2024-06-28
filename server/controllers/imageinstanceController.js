const asyncHandler = require("express-async-handler");
const ImageInstance = require("../config/models/imageinstance");
const sizeOf = require("image-size");
const path = require("path");
const fs = require("fs");

const imageinstanceController = {
  //create
  create_image: asyncHandler(async (req, res) => {
    const { public_id } = req.body;

    // Check if an image with the same public_id already exists
    const existingImage = await ImageInstance.findOne({ public_id });

    if (existingImage) {
      // If an image with the same public_id exists, update its details
      await ImageInstance.updateOne({ public_id }, req.body);

      // Fetch the updated image
      const updatedImage = await ImageInstance.findOne({ public_id });

      res.status(200).json({
        updatedImage,
        message: "Image instance updated successfully in database",
      });
    } else {
      // If no existing image found with the same public_id, create a new one
      const newImage = new ImageInstance(req.body);
      await newImage.save();

      res.status(201).json({
        newImage,
        message: "Image instance created successfully in database",
      });
    }
  }),

  upload_image: asyncHandler(async (req, res) => {
    const filename = req.file.filename;
    const url = `http://${req.get("host")}/images/${filename}`;
    const secureUrl = `https://${req.get("host")}/images/${filename}`;
    const imagePath = req.file.path;
    const dimensions = sizeOf(imagePath);

    res.status(201).json({
      url: url,
      secure_url: secureUrl,
      dimensions: dimensions,
      filename: filename,
      message: "Image file saved successfully",
    });
  }),

  //read
  get_images: asyncHandler(async (req, res) => {
    const images = await ImageInstance.find().sort({ timestamp: -1 });
    if (!images || images.length === 0) {
      return res.status(404).json({ message: "Images not found" });
    }
    res.status(200).json(images);
  }),

  //update
  update_image: asyncHandler(async (req, res) => {
    req.body.modified_date = Date.now();

    const updatedImage = await ImageInstance.findOneAndUpdate(
      { public_id: req.params.public_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json(updatedImage);
  }),

  //delete
  delete_image: asyncHandler(async (req, res) => {
    const { selectedImages } = req.body;

    if (!Array.isArray(selectedImages) || selectedImages.length === 0) {
      return res.status(400).json({
        error: {
          message:
            "Invalid request. selectedImages should be a non-empty array.",
        },
      });
    }

    // Delete image instances from the database and files from server
    for (const image of selectedImages) {
      const { public_id, original_path } = image;

      // Delete image instance from the database
      const deleteResult = await ImageInstance.deleteOne({ public_id });
      if (deleteResult.deletedCount === 0) {
        console.error("No image found in database with public_id:", public_id);
        continue;
      }

      // Delete image file from the server
      const filePath = path.join(__dirname, "../public/images", original_path);
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({
            error: {
              message: `Error deleting file ${filePath}:, ${err}`,
            },
          });
        }
      });
    }

    res.status(200).json({ message: "Images deleted successfully." });
  }),
};

module.exports = imageinstanceController;
