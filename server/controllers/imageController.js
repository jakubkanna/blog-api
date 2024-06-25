const asyncHandler = require("express-async-handler");
const Image = require("../config/models/image");

const imageController = {
  //create
  create_image: asyncHandler(async (req, res) => {
    //save file
    //
    //save reference in db
    const newImage = new Image(req.body);
    await newImage.save();
    res.status(201).json(newImage);
  }),
  //read
  get_images: asyncHandler(async (req, res) => {
    const images = await Image.find().sort({ timestamp: -1 });
    if (!images || images.length === 0) {
      return res.status(404).json({ message: "Images not found" });
    }
    res.status(200).json(images);
  }),
  //update
  update_image: asyncHandler(async (req, res) => {
    req.body.modified_date = Date.now();

    const updatedImage = await Image.findByIdAndUpdate(
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
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  }),
};

module.exports = imageController;
