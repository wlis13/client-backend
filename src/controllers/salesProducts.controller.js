const { deleteProdSaleService } = require("../services/salesProducts.service");

async function salesProductsController(req, res) {
  const { id } = req.params;
  const result = await findProductsQuantity(Number(id));
  res.status(200).json(result);
};

async function deleteProdSaleController(req, res) {
  const deletedProdSale = await deleteProdSaleService();
  res.status(204).json(deletedProdSale);
};

module.exports = {
  salesProducts,
  deleteProdSaleController,
};
