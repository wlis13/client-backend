const {
  getAllUserByRole,
  loginUserService,
  registerUserService,
  getUserByIdService,
  deleteAllUsers,
  deleteUserById,
  getAllSellersService,
} = require('../services/user.service');

async function loginContoller(req, res) {
  const userFromReq = req.body;
  const token = await loginUserService(userFromReq);
  return res.status(200).json( token );
};

async function userRegisterController(req, res) {
  const userToRegister = req.body;
  const createdUser = await registerUserService(userToRegister);
  return res.status(201).json(createdUser);
};

async function allUserByRoleController(req, res) {
  const { role } = req.params;
  const sellerList = await getAllUserByRole(role);
  return res.status(200).json(sellerList);
};

async function userByIdController(req, res) {
  const { id } = req.params;
  const user = await getUserByIdService(id);
  return res.status(200).json(user);
};

async function deleteAllUsersController(_req, res) {
  const messageDeleteUser = await deleteAllUsers();
  res.status(204).json({ messageDeleteUser });
};

async function deleteUserByIdController(req, res) {
  const { id } = req.params;
  const messageDeleteUserById = await deleteUserById(id);
  res.status(204).json(messageDeleteUserById);
};

async function getAllSellersController(req, res) {
  const recoverListSellers = await getAllSellersService();
  res.status(200).json(recoverListSellers);
};

module.exports = {
  loginContoller,
  userRegisterController,
  allUserByRoleController,
  userByIdController,
  getAllSellersController,
  deleteAllUsersController,
  deleteUserByIdController,
};
