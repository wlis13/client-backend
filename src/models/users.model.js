const mongoose = require('mongoose');

const user = mongoose.model('user', {
  id: Number,
  name: String,
  email: String,
  password: String,
  password_hash: String,
  role: String,
});

module.exports = user;
