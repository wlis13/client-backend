const path = require('path');
const fs = require('fs/promises');

const PATH_PRODUCTS = "../../database/products.json";

async function getAllProductsService() {
  const pathProduct = path.join(__dirname, PATH_PRODUCTS);
  const dataProducts = JSON.parse(await fs.readFile(pathProduct, "utf-8"));
  return dataProducts;
}

module.exports = {
  getAllProductsService,
};