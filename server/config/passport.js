//passport.js
require("dotenv").config();

const passport = require("passport");
const User = require("./models/user");
const asyncHandler = require("express-async-handler");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const strategy = new JwtStrategy(
  opts,
  asyncHandler(async (payload, done) => {
    const user = await User.findOne({ _id: payload.sub });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);

passport.use(strategy);
