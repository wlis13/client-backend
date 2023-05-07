const sale = require('../models/sales.model');

async function detailsOrderService(id) {
  const getSale = await sale.find({ user_id: id }).exec();
  return getSale;
}

module.exports = {
  detailsOrderService,
};
