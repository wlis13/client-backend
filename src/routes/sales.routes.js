const { Router } = require('express');
const { 
  registerNewSaleController, 
  deleteAllSaleController, 
  deleteSaleByIdController,
} = require('../controllers/sale.controller');

const salesRoutes = Router();

salesRoutes.post('/register/sale', registerNewSaleController);
salesRoutes.delete('/delete/sale', deleteAllSaleController);
salesRoutes.delete('/delete/sale/:id', deleteSaleByIdController);

module.exports = {
  salesRoutes,
};
