const mongoose = require('mongoose');

const product = mongoose.model('product', {
  id: Number,
  name: String,
  price: Number,
  url_image: String,
});

module.exports = product;
