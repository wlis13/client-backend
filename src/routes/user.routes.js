const { Router } = require('express');

const {
  // userRegisterController,
  loginContoller,
  // allUserByRoleController,
  // userByIdController,
} = require('../controllers/userControllers');

const userRouter = Router();

userRouter.post("/", loginContoller);
// userRouter.post("/register/user", userRegisterController);
// userRouter.get("/users/:role", allUserByRoleController);
// userRouter.get("/users-id/:id", userByIdController);

module.exports = {
  userRouter,
};
