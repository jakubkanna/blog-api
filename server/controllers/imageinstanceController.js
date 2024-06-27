const asyncHandler = require("express-async-handler");
const ImageInstance = require("../config/models/imageinstance");
const sizeOf = require("image-size");

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

    const updatedImage = await ImageInstance.findByIdAndUpdate(
      req.params.id,
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
    const deletedImage = await ImageInstance.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  }),
};

module.exports = imageinstanceController;
