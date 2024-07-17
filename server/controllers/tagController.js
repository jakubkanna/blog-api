const asyncHandler = require("express-async-handler");
const Post = require("../config/models/post");
const Event = require("../config/models/event");
const Work = require("../config/models/Work");

const tagController = {
  get_tags: asyncHandler(async (req, res) => {
    const eventTags = await Event.distinct("tags");
    const postTags = await Post.distinct("tags");
    const workTags = await Work.distinct("tags");

    const allTags = Array.from(
      new Set([...eventTags, ...postTags, ...workTags])
    );

    if (!allTags) res.status(404).json({ message: "Tags not found" });
    res.status(200).json(allTags);
  }),
};

module.exports = tagController;
