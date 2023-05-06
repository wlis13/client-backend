const sale = require('../models/sales.model');
const user = require('../models/users.model');

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
  
  // // lê o arquivo de vendas
  // const fileSales = path.join(__dirname, PATH_SALES);
  // const dataSales = JSON.parse(await fs.readFile(fileSales, 'utf-8'));

  // // adiciona a nova venda no array de vendas
  const newSale = {
    _id: dataSales.length + 1, // gera o ID da nova venda
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    products,
  };
  // dataSales.push(newSale);

  // await fs.writeFile(fileSales, JSON.stringify(dataSales));

  // return newSale; // retorna a nova venda adicionada
}



async function allSaleService(id) {
  const user = await user.findById(id);

  if (user.role === 'seller') {
    const getSaleById = await sale.findById(id);
    return getSaleById;
  } else {
    const getSaleById = await sale.findById(id);
    const getUserBySaleId = await user.findById(getSaleById.id)
    const { name } = getUserBySaleId;
    return { ...getSaleById, name };
  }
}

async function updateState(status, id) {
  const updateSaleById = await sale.updateOne({ id: id }, { status: status });
  return updateSaleById;
}

module.exports = {
  registerNewSale,
  allSaleService,
  updateState,
};
