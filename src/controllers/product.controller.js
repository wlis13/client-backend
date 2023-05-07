const { getAllProductsService, insertProductsService, deleteProductsService, deleteOneProductService } = require('../services/product.service');

async function allProductController(_req, res) {
  const result = await getAllProductsService();
  res.status(200).json(result);
};

async function insertProductsController(req, res) {
  const insertion = await insertProductsService(req.body);
  res.status(201).json({ insertion });
};

async function deleteProductsController(_req, res) {
  const deletedProducts = await deleteProductsService();
  res.status(201).json(deletedProducts);
};

async function deleteOneProductController(req, res) {
  const { id } = req.params;
  const deletedOneProduct = await deleteOneProductService(id);
  res.status(201).json(deletedOneProduct);
};

module.exports = {
  allProductController,
  insertProductsController,
  deleteProductsController,
  deleteOneProductController,
};