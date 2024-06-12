const asyncHandler = require("express-async-handler");
const Work = require("../config/models/work");

const workController = {
  get_works: asyncHandler(async (req, res) => {
    const posts = await Work.find().sort({ start_date: -1 });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Works not found" });
    }
    res.status(200).json(posts);
  }),

  update_work: asyncHandler(async (req, res) => {
    req.body.modified = Date.now();

    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedWork) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.status(200).json({ message: "Work updated successfully" });
  }),
};
module.exports = workController;
