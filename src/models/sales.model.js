const mongoose = require('mongoose');

const sale = mongoose.model('sale', {
  user_id: Number,
  seller_id: Number,
  total_price: Number,
  delivery_address: String,
  delivery_number: String,
  sale_date: Date,
  status: String,
});

module.exports = sale;
