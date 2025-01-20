const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// Login Route
router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    let user = await User.findOne({ username });

    // Create user if it doesn't exist
    if (!user) {
      user = new User({ username });
      await user.save();
      console.log(`New user created: ${username}`);
    }

    res.status(200).json({ message: "Login Success", user });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;