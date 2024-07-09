const express = require('express');
const router = express.Router();
const { validateLogin } = require('../middleware/validation');
const User = require("../models/User");

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('User does not exist');
    }

    // Compare passwords in plain text (not recommended for production)
    if (password !== user.password) {
      throw Error('Invalid credentials');
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
