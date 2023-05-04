const { Router } = require('express');
const { registerNewSaleController } = require('../controllers/sale.controller');

const salesRoutes = Router();

salesRoutes.post('/sale', registerNewSaleController);

module.exports = {
  salesRoutes,
};
