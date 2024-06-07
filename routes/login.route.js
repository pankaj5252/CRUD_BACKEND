const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const LoginUser = require('../models/loginUser.model');
const router = express.Router();

// Secret key for JWT (store it in environment variable in production)
const JWT_SECRET =process.env.JWT_SECRET;

// Login User
router.post(
  '/',
  [
    // Validation middleware
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Attempt to find the user with the provided credentials
      const loginuser = await LoginUser.findOne({ username, password });

      if (loginuser) {
        // Generate JWT
        //console.log(loginuser);
        const token = jwt.sign({ id: loginuser._id, username: loginuser.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token , user: loginuser});
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
