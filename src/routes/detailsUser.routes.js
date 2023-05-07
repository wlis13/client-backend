const { Router } = require('express');
const { detailsOrderController } = require('../controllers/detalsUser.controller');

const detailsRouter = Router();

detailsRouter.get("/customer/orders/:id", detailsOrderController);

module.exports = {
  detailsRouter,
};
