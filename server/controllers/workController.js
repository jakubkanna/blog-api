const asyncHandler = require("express-async-handler");
const Work = require("../config/models/work");

const workController = {
  get_works: asyncHandler(async (req, res) => {
    const works = await Work.find().sort({ timestamp: -1 });
    if (!works || works.length === 0) {
      return res.status(404).json({ message: "Works not found" });
    }
    res.status(200).json(works);
  }),

  update_work: asyncHandler(async (req, res) => {
    req.body.modified_date = Date.now();

    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedWork) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.status(200).json(updatedWork);
  }),

  create_work: asyncHandler(async (req, res) => {
    const newWork = new Work(req.body);
    await newWork.save();
    res.status(201).json(newWork);
  }),

  delete_work: asyncHandler(async (req, res) => {
    const deletedWork = await Work.findByIdAndDelete(req.params.id);
    if (!deletedWork) {
      return res.status(404).json({ message: "Work not found" });
    }
    res.status(200).json({ message: "Work deleted successfully" });
  }),
};

module.exports = workController;
