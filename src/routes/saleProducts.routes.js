const { Router } = require('express');
const { 
  deleteProdSaleController,
 } = require('../controllers/salesProducts.controller');

const saleProductsRouter = Router();

saleProductsRouter.delete('/delete/saleProducts', deleteProdSaleController);

module.exports = {
  saleProductsRouter,
};
