const asyncHandler = require("express-async-handler");

const mediaController = {
  get_tags: asyncHandler(async (req, res) => {
    //get all ImageInstances, and VideoInstances

    if (!allMedia) res.status(404).json({ message: "Media not found" });
    res.status(200).json(allMedia);
  }),
};

module.exports = mediaController;
