const { Router } = require('express');
const { 
  requestLogin, 
  requestUserRegistration, 
  requestAllUserByRole,
  requestUserById,
} = require('../controllers/userControllers');
const validateUserAlreadyExists = require('../middlewares/userAlready');

const userRouter = Router();

userRouter.post('/login', requestLogin);
userRouter.post('/register', validateUserAlreadyExists, requestUserRegistration);
userRouter.get('/id/:id', requestUserById);
userRouter.get('/:role', requestAllUserByRole);

module.exports = userRouter;
