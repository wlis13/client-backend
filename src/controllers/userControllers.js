const {
  getAllUserByRole,
  loginUserService,
  registerUserService,
  getUserByIdService,
} = require('../services/user.service');

async function loginContoller(req, res) {
  const userFromReq = req.body;
  const token = await loginUserService(userFromReq);
  return res.status(200).json({ message: "meu ovo" });
}

async function userRegisterController(req, res) {
  const userToRegister = req.body;
  const createdUser = await registerUserService(userToRegister);
  return res.status(201).json(createdUser);
}

async function allUserByRoleController(req, res) {
  const { role } = req.params;
  const sellerList = await getAllUserByRole(role);
  return res.status(200).json(sellerList);
}

async function userByIdController(req, res) {
  const { id } = req.params;
  const user = await getUserByIdService(id);
  return res.status(200).json(user);
}

module.exports = {
  loginContoller,
  userRegisterController,
  allUserByRoleController,
  userByIdController,
};
