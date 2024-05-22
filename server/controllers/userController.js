const asyncHandler = require("express-async-handler");
const User = require("../config/models/user");

// CRUD for users
const userController = {
  get_users: asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(users);
  }),

  get_user: asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }),
};

module.exports = userController;
