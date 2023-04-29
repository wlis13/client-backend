const path = require('path');
const fs = require("fs/promises");

const PATH_SALES = "../../database/sales.json";
const PATH_SALES_PRODUCTS = "../../database/sale_products.json";
const PATH_PRODUCTS = "../../database/products.json";

async function findProductsQuantity(id) {
  const pathSales = path.join(__dirname, PATH_SALES);
  const dataSales = JSON.parse(await fs.readFile(pathSales, "utf-8"));
  const getSalesById = dataSales.find((sale) => sale.seller_id === Number(id));

  const pathSaleProduct = path.join(__dirname, PATH_SALES_PRODUCTS);
  const dataSaleProduct = JSON.parse(await fs.readFile(pathSaleProduct, "utf-8"));
  const getSaleProductById = dataSaleProduct
    .find((saleProd) => saleProd.sale_id === getSalesById.id)

  const pathProduct = path.join(__dirname, PATH_PRODUCTS);
  const dataProduct = JSON.parse(await fs.readFile(pathProduct, "utf-8"));
  const getProduct = dataProduct.find((prod) => prod.id === getSaleProductById.id);

  const { id, total_price, sale_date } = getSalesById;
  const { quantity } = getSaleProductById;
  const { name, price } = getProduct;

  const results = {
    id,
    total_price,
    sale_date,
    name,
    price,
    quantity,
  }
  return results;
}

module.exports = {
  findProductsQuantity,
};

// s.id, s.total_value, s.created_at, p.name, p.price, sp.quantity