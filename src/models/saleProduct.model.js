const mongoose = require('mongoose');

const saleProduct = mongoose.model('saleProduct', {
  id: Number,
  seller_id: Number,
  product_id: Number,
  quantity: Number,
});

module.exports = saleProduct;
