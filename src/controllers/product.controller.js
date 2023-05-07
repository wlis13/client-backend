const { getAllProductsService, insertProductsService } = require('../services/product.service');

async function allProductController(_req, res) {
  const result = await getAllProductsService();
  res.status(200).json(result);
}

async function insertProductsController(req, res) {
  const insertion = await insertProductsService(req.body);
  res.status(201).json({ insertion });
}

module.exports = {
  allProductController,
  insertProductsController,
};