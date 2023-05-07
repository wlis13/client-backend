const product = require('../models/products.model');

async function getAllProductsService() {
  const products = await product.find().exec();
  return products;
};

module.exports = {
  getAllProductsService,
};