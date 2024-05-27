const asyncHandler = require("express-async-handler");
const User = require("../config/models/user");
const genPassword = require("../lib/passwordUtils").genPassword;
const validPassword = require("../lib/passwordUtils").validPassword;
const issueJWT = require("../lib/jwtUtils").issueJWT;

const userController = {
  // auth

  post_login: asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res.status(401).json({
        success: false,
        message: "Could not find user " + req.body.username,
      });

    const isValid = validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const jwt = issueJWT(user);
      res.status(200).json({
        success: true,
        user: user,
        token: jwt.token,
        expiersIn: jwt.expires,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "You entered the wrong password." });
    }
  }),

  post_register: asyncHandler(async (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    const jwt = issueJWT(newUser);

    res.json({
      success: true,
      message: "You have registered successfully.",
      user: newUser,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  }),

  //crud

  get_users: asyncHandler(async (req, res) => {
    const users = await User.find({}, { salt: 0, hash: 0, email: 0 });
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(users);
  }),

  get_user: asyncHandler(async (req, res) => {
    const user = await User.findOne(
      { _id: req.params.id },
      { salt: 0, hash: 0, email: 0 }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }),
};

module.exports = userController;