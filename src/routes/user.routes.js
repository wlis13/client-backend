const { Router } = require('express');

const {
  userRegisterController,
  loginContoller,
  allUserByRoleController,
  userByIdController,
  deleteAllUsersController,
  deleteUserByIdController,
} = require('../controllers/userControllers');

const userRouter = Router();

userRouter.post("/login", loginContoller);
userRouter.post("/register/user", userRegisterController);
userRouter.get("/users/:role", allUserByRoleController);
userRouter.get("/users-id/:id", userByIdController);
userRouter.delete("/delete-all-users", deleteAllUsersController);
userRouter.delete("/delete-user-id", deleteUserByIdController);

module.exports = {
  userRouter,
};
