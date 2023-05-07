const { Router } = require('express');
const { 
  allProductController, 
  insertProductsController,
} = require('../controllers/product.controller');

const productsRoutes = Router();

productsRoutes.get("/products", allProductController);
productsRoutes.post("/insert/products", insertProductsController);

module.exports = {
  productsRoutes,
}