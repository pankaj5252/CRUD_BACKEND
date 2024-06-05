const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
  username: String,
  password: String
},'users');

const LoginUser = mongoose.model('users', loginUserSchema);

module.exports = LoginUser;