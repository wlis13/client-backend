const { getUserById } = require('./user.service');
const path = require('path');
const fs = require("fs/promises");

const PATH_SALES = "../../database/sales.json";
const PATH_USERS = "../../database/users.json";

const fs = require('fs');
const path = require('path');

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
  
  // lê o arquivo de vendas
  const fileSales = path.join(__dirname, 'sales.json');
  const dataSales = JSON.parse(await fs.promises.readFile(fileSales, 'utf-8'));

  // adiciona a nova venda no array de vendas
  const newSale = {
    id: dataSales.length + 1, // gera o ID da nova venda
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    products,
  };
  dataSales.push(newSale);

  // escreve o conteúdo atualizado do arquivo de vendas
  await fs.promises.writeFile(fileSales, JSON.stringify(dataSales));

  return newSale; // retorna a nova venda adicionada
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
