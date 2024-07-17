const asyncHandler = require("express-async-handler");
const VideoInstance = require("../config/models/VideoInstance");

const videoinstanceController = {
  //create
  create_video: asyncHandler(async (req, res) => {
    const { _id } = req.body;

    // Check if an video with the same _id already exists
    const existingVideo = await VideoInstance.findOne({ _id });

    if (existingVideo) {
      // If an video with the same _id exists, update its details
      await VideoInstance.updateOne({ _id }, req.body);

      // Fetch the updated video
      const updatedVideo = await VideoInstance.findOne({ _id });

      res.status(200).json({
        VideoInstance: updatedVideo,
        message: "Video instance updated successfully in database",
      });
    } else {
      // If no existing video found with the same _id, create a new one
      const newVideo = new VideoInstance(req.body);
      await newVideo.save();

      res.status(201).json({
        VideoInstance: newVideo,
        message: "Video instance created successfully in database",
      });
    }
  }),

  //read
  get_videos: asyncHandler(async (req, res) => {
    const videos = await VideoInstance.find().sort({ timestamp: -1 });
    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "Videos not found" });
    }
    res.status(200).json(videos);
  }),

  //update
  update_video: asyncHandler(async (req, res) => {
    req.body.modified = Date.now();

    const updatedVideo = await VideoInstance.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(updatedVideo);
  }),

  //delete
  delete_video: asyncHandler(async (req, res) => {
    const selectedVideos = req.body;

    for (const video of selectedVideos) {
      const { _id } = video;

      // Delete the video instance from the database
      await VideoInstance.deleteOne({ _id });
    }

    res.status(200).json({ message: "Videos deleted successfully." });
  }),
};

module.exports = videoinstanceController;
