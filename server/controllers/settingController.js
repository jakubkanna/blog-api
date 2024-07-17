const asyncHandler = require("express-async-handler");
const Setting = require("../config/models/Setting");

const settingController = {
  get_settings: asyncHandler(async (req, res) => {
    const latestSetting = await Setting.findOne()
      .sort({ timestamp: -1 })
      .limit(1);

    if (!latestSetting) {
      return res.status(404).json({ message: "Settings not found" });
    }

    res.json(latestSetting);
  }),
  update_settings: asyncHandler(async (req, res) => {
    req.body.modified = Date.now();

    if (req.body.post === "") req.body.post = null;

    const updatedEvent = await Setting.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Setting not found" });

    res.status(200).json(updatedEvent);
  }),
};

module.exports = settingController;
