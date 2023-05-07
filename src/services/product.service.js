const product = require('../models/products.model');

async function getAllProductsService() {
  const products = await product.find().exec();
  return products;
};

async function insertProductsService(productsFromReq) {
  await product.insertMany(productsFromReq);
  return 'produtos inseridos com sucesso!';
}

async function deleteProductsService() {
  await product.deleteMany();
  return 'todos os produtos foram deletados!';
}

async function deleteOneProductService(id) {
  await product.deleteOne({ id: id });
  return `produto com id: ${id} foi removido!`;
}

module.exports = {
  getAllProductsService,
  insertProductsService,
  deleteProductsService,
  deleteOneProductService,
};