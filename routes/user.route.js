const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');
const router = express.Router();

// Register user
router.post(
  '/',
  async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email or username already exists' });
      }

      const user = new User({
        name,
        email,
        username,
        password
      });

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
);

// Get Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
