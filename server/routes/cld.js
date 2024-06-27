var express = require("express");
var router = express.Router();
var crypto = require("crypto"); // Ensure you import crypto
const { isLoggedIn } = require("../middleware/authUtils");
require("dotenv").config(); // Ensure you have dotenv to manage environment variables

const CLD_API_SECRET = process.env.CLD_API_SECRET; // Ensure you have this set in your .env file

router.post("/signature", isLoggedIn, (req, res) => {
  const { public_id, timestamp } = req.body;

  if (!public_id || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const signature = generateSignature(public_id, timestamp);
  res.json({ signature });
});

function generateSignature(public_id, timestamp) {
  const hash = crypto.createHash("sha1");
  hash.update(`public_id=${public_id}&timestamp=${timestamp}${CLD_API_SECRET}`);
  return hash.digest("hex");
}

module.exports = router;
