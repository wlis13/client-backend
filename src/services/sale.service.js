const sale = require('../models/sales.model');
const user = require('../models/users.model');

async function registerNewSaleService(saleFromReq) {
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
  const dataSales = await sale.find().exec();
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
  // dataSales.push(newSale);

  // await fs.writeFile(fileSales, JSON.stringify(dataSales));
  await sale.create(dataSales);

  return newSale; // retorna a nova venda adicionada
}



async function allSaleService(id) {
  const User = await user.findById(id);

  if (User.role === 'seller') {
    const getSaleById = await sale.findById(id);
    return getSaleById;
  } else {
    const getSaleById = await sale.findById(id);
    const { name } = await user.findById(getSaleById.id)
    return { ...getSaleById, name };
  }
}

async function updateState(status, id) {
  const updateSaleById = await sale.updateOne({ id: id }, { status: status });
  return updateSaleById;
}

module.exports = {
  registerNewSaleService,
  allSaleService,
  updateState,
};
