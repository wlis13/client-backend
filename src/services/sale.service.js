const saleProduct = require('../models/saleProduct.model');
const sale = require('../models/sales.model');
const user = require('../models/users.model');

async function registerNewSaleService(saleFromReq) {
  const { products, ...saleWithoutProducts } = saleFromReq;
  const {
    user_id,
    seller_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status,
  } = saleWithoutProducts;
  
  const dataSales = await sale.find().exec();
  // adiciona a nova venda no array de vendas
  const newSale = {
    id: dataSales.length + 1, // gera o ID da nova venda
    user_id,
    seller_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status,
  };
  await sale.create(dataSales);
  // const dataSaleProduct = await saleProduct.find().exec();
  // const createNewListSalesProduct = products.map((iten) => {
  //   const newSaleProcuct = {
  //     id: dataSaleProduct.length + 1,
  //     seller_id,
  //     product_id: iten.producId,
  //     quantity: iten.quantity,
  //   }
  // });

  await saleProduct.create({})

  return newSale; // retorna a nova venda adicionada
};

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
};

async function updateState(status, id) {
  const updateSaleById = await sale.updateOne({ id: id }, { status: status });
  return updateSaleById;
};

module.exports = {
  registerNewSaleService,
  allSaleService,
  updateState,
};
