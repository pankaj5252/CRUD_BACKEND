const express = require('express');
const LoginUser = require('../models/loginUser.model');
const router = express.Router();

// Login User
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // console.log(`Attempting login with username: ${username} and password: ${password}`);
    const loginuser = await LoginUser.findOne({ username, password });
    // console.log(loginuser)

    if (loginuser) {
      // console.log('Login successful',loginuser);
      res.status(200).json({ message: 'Login successful' });
    } else {
      // console.log('Invalid credentials',loginuser);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
