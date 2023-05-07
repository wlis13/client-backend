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
productsRoutes.put("/delete/products", deleteProductsController);
productsRoutes.put("/delete/one/product", deleteOneProductController);

module.exports = {
  productsRoutes,
}