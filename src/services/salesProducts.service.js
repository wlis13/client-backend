const sale = require('../models/sales.model');
const saleProduct = require('../models/saleProduct.model');
const product = require('../models/products.model');

async function findProductsQuantity(id) {
  const getSaleBySellerId = await sale.findOne({
    seller_id: id
  });
   
  const getSaleProductBySale = await saleProduct.findOne({
    sale_id: getSaleBySellerId._id
  });
  
  const getProductBySaleProduct = await product.findOne({
    _id: getSaleProductBySale._id
  });

  const { _id, total_price, sale_date } = getSaleBySellerId;
  const { quantity } = getSaleProductBySale;
  const { name, price } = getProductBySaleProduct;

  const results = {
    _id,
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
