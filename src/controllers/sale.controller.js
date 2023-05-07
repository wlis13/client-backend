const { 
  allSaleService, 
  updateState, 
  registerNewSaleService,
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

module.exports = {
  registerNewSaleController,
  allSaleController,
  updateSale,
};
