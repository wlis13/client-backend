const mongoose = require('mongoose');

const product = mongoose.model('product', {
  name: String,
  price: Number,
  url_image: String,
});

module.exports = product;
