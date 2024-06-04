const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = new User({ name, email, username, password },'user');
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;