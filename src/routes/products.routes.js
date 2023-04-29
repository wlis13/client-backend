const { Router } = require('express');
const { allProductController } = require('../controllers/product.controller');

const productsRoutes = Router();

productsRoutes.get("/products", allProductController);

module.exports = {
  productsRoutes,
}