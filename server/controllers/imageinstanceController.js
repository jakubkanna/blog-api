const asyncHandler = require("express-async-handler");
const ImageInstance = require("../config/models/imageinstance");
const sizeOf = require("image-size");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

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
        imageinstance: updatedImage,
        message: "Image instance updated successfully in database",
      });
    } else {
      // If no existing image found with the same public_id, create a new one
      const newImage = new ImageInstance(req.body);
      await newImage.save();

      res.status(201).json({
        imageinstance: newImage,
        message: "Image instance created successfully in database",
      });
    }
  }),
  // Upload images
  upload_image: asyncHandler(async (req, res) => {
    const files = req.files;
    const imageInstances = [];

    for (const file of files) {
      const dimensions = sizeOf(file.path);
      const newImage = {
        public_id: file.filename,
        original_filename: file.originalname,
        filename: file.filename,
        path: file.path,
        format: file.mimetype.split("/")[1],
        dimensions: dimensions,
        url: `http://${req.get("host")}/images/${file.filename}${file.format}`,
        secure_url: `https://${req.get("host")}/images/${file.filename}${
          file.format
        }`,
        bytes: file.size,
      };

      // Check if an image with the same public_id already exists
      let imageInstance = await ImageInstance.findOne({
        public_id: newImage.public_id,
      });

      if (imageInstance) {
        // Update the existing image instance
        await ImageInstance.updateOne(
          { public_id: newImage.public_id },
          newImage
        );
        imageInstance = await ImageInstance.findOne({
          public_id: newImage.public_id,
        });
      } else {
        // Create a new image instance
        imageInstance = new ImageInstance(newImage);
        await imageInstance.save();
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
        public_id: newImage.public_id,
        overwrite: true,
      });

      const cld_url = cloudinaryResponse.url;
      const cld_secure_url = cloudinaryResponse.secure_url;

      // Update the image instance with Cloudinary URLs
      await ImageInstance.updateOne(
        { public_id: newImage.public_id },
        { cld_url: cld_url, cld_secure_url: cld_secure_url }
      );

      // Refresh the image instance with the latest data
      imageInstance = await ImageInstance.findOne({
        public_id: newImage.public_id,
      });

      imageInstances.push(imageInstance);
    }

    res.status(201).json({
      message: "Images uploaded successfully",
      imageInstances,
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

    for (const image of selectedImages) {
      const { public_id } = image;

      // IF ENABLE_CLD Delete from Cloudinary
      await cloudinary.uploader.destroy(public_id);

      // Delete the file
      await fs.promises.unlink(image.path);

      // Delete the image instance from the database
      await ImageInstance.deleteOne({ public_id });
    }

    res.status(200).json({ message: "Images deleted successfully." });
  }),
};

module.exports = imageinstanceController;
