const product = require('../models/products.model');

async function getAllProductsService() {
  const products = await product.find().exec();
  return products;
};

async function insertProductsService(productsFromReq) {
  await product.insertMany(productsFromReq);
  return 'produtos inseridos com sucesso!';
}

module.exports = {
  getAllProductsService,
  insertProductsService,
};