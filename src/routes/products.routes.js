const { Router } = require('express');
const { 
  allProductController, 
  insertProductsController,
  deleteProductsController,
  deleteOneProductController,
} = require('../controllers/product.controller');

const productsRoutes = Router();

productsRoutes.get("/products", allProductController);
productsRoutes.post("/insert/products", insertProductsController);
productsRoutes.delete("/delete/products", deleteProductsController);
productsRoutes.delete("/delete/product/:id", deleteOneProductController);

module.exports = {
  productsRoutes,
}