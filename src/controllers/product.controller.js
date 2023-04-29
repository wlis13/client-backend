const { getAllProductsService } = require('../services/product.service');

async function allProductController(_req, res) {
  const result = await getAllProductsService();
  res.status(200).json(result);
}

module.exports = {
  allProductController,
};