const { getUserById } = require('./user.service');
const connection = require('../connections/connection');
const path = require('path');
const fs = require("fs/promises");

const PATH_SALES = "../../database/sales.json";
const PATH_USERS = "../../database/users.json";

async function registerNewSale(saleFromReq) {
  const { products, ...saleWithoutProducts } = saleFromReq;
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  } = saleWithoutProducts;
  const result = await connection.execute(
    `INSERT INTO sales (user_id, seller_id, total_price, delivery_address, 
    delivery_number, sale_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status
    ]
  );
  const saleId = result.insertId;

  const salesProductsPromises = products.map(({ productId, quantity }) => {
    const sql = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const values = [saleId, productId, quantity];
    return connection.execute(sql, values);
  });

  await Promise.all(salesProductsPromises);
  return result[0]; // retorna o resultado da inserção na tabela 'sales'
}


async function allSaleService(id) {
  const user = await getUserById(id);

  if (user.role === 'seller') {
    const pathSales = path.join(__dirname, PATH_SALES);
    const dataSales = JSON.parse(await fs.readFile(pathSales, "utf-8"));
    const getSalesById = dataSales.find((sale) => sale.id === Number(id));
    return getSalesById;
  } else {
    const pathSales = path.join(__dirname, PATH_SALES);
    const dataSales = JSON.parse(await fs.readFile(pathSales, "utf-8"));
    const getSalesById = dataSales.find((sale) => sale.user_id === Number(id));

    const pathUser = path.join(__dirname, PATH_USERS);
    const dataUser = JSON.parse(await fs.readFile(pathUser, "utf-8"));
    const getUser = dataUser.find((user) => user.id === getSalesById.id);
    const { name } = getUser;
    return { ...getSalesById, name };
  }
}

async function updateState(status, id) {
  const pathSales = path.join(__dirname, PATH_SALES);
  const dataSales = JSON.parse(await fs.readFile(pathSales, "utf-8"));
  const getDataSales = dataSales.filter((sale) => {
    if (sale.id === Number(id)) {
      sale.status = status
    }
  });
  await fs.writeFile(pathSales, JSON.stringify(getDataSales));
}

module.exports = {
  registerNewSale,
  allSaleService,
  updateState,
};
