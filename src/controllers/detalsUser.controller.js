const { detailsOrderService } = require("../services/customer.service");

async function detailsOrderController(req, res) {
  const { id } = req.params;
  const getSale = await detailsOrderService(Number(id));
  res.status(200).json(getSale);
};

module.exports = {
  detailsOrderController,
};
