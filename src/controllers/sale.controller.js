const { 
  allSaleService, 
  updateState, 
  registerNewSaleService,
  deleteAllSaleService,
  deleteSaleByIdService,
 } = require('../services/sale.service');

async function registerNewSaleController(req, res) {
  const saleToRegister = req.body;
  const createdSale = await registerNewSaleService(saleToRegister);
  return res.status(201).json(createdSale);
}

async function allSaleController(req, res) {
  const { id } = req.params;
  const getAllSale = await allSaleService(id);
  res.status(200).json(getAllSale);
}

async function updateSale(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  await updateState(status, Number(id));
  res.status(200).end();
}

async function deleteAllSaleController(_req, res) {
  const deletedAllSale = await deleteAllSaleService();
  res.status(204).json(deletedAllSale);
};

async function deleteSaleByIdController(req, res) {
  const { id } = req.params;
  const deletedSaleById = await deleteSaleByIdService(Number(id));
  res.status(204).json(deletedSaleById);
}

module.exports = {
  registerNewSaleController,
  allSaleController,
  updateSale,
  deleteAllSaleController,
  deleteSaleByIdController,
};
