const app = require("../index");
const cors = require('cors');
const { Router } = require('express');

const {
  userRegisterController,
  loginContoller,
  allUserByRoleController,
  userByIdController,
} = require('../controllers/userControllers');

app.use(cors({
  origin: 'http://localhost:3000',
}));

const userRouter = Router();

userRouter.post("/login", loginContoller);
userRouter.post("/register/user", userRegisterController);
userRouter.get("/users/:role", allUserByRoleController);
userRouter.get("/users-id/:id", userByIdController);

module.exports = {
  userRouter,
};
