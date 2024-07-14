const asyncHandler = require("express-async-handler");
const Setting = require("../config/models/setting");

const settingController = {
  get_settings: asyncHandler(async (req, res) => {
    const settings = await Setting.find();

    if (!settings || settings.length === 0) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.json(settings);
  }),
};

module.exports = settingController;
