const express = require('express');
const router = express.Router();
const LoginUser = require('../models/loginUser.model');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  LoginUser.findOne({ username, password }, (err, loginuser) => {
    if (err) {
      res.status(500).send({ message: 'Error logging in' });
    } else if (!loginuser) {
      res.status(401).send({ message: 'Invalid credentials' });
    } else {
      res.send({ message: 'Login successful' });
    }
  });
});

router.post('/logout', (req, res) => {
  // logout logic
});

module.exports = router;