const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const LoginUser = mongoose.model('LoginUser', loginUserSchema);

module.exports = LoginUser;