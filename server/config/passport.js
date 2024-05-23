//passport.js
require("dotenv").config();

const passport = require("passport");
const User = require("./models/user");
const asyncHandler = require("express-async-handler");
const validPassword = require("../lib/passwordUtils").validPassword;
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.algorithm = "RS256";

const strategy = new JwtStrategy(
  opts,
  asyncHandler(async (payload, done) => {
    const user = await User.findOne({ _id: payload.sub });
    user ? done(null, user) : done(null, false);
  })
);

passport.use(strategy);
