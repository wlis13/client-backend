const { generateToken } = require('../utils/jwt');
const { hashPassword } = require('../utils/crypto');
const user = require('../models/users.model');

async function loginUserService(userFromReq) {
  const getUser = await user.findOne({ email: userFromReq.email });
  const token = await generateToken(getUser);
  if (getUser !== null) {
  return { ...getUser, token };
  }
}

async function registerUserService(userFromReq) {
  const password_hash = hashPassword(userFromReq.password);
  const getAllUsers = await user.find().exec();
  const insertNewUser = await user
    .create({ id: getAllUsers.length + 1, password_hash, ...userFromReq });
  return insertNewUser;
}

async function getAllUserByRole(role) {
  const getUserByRole = await user.find({ role: role }).exec();
  const userList = getUserByRole.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  }));

  return userList;
}

async function getUserByIdService(id) {
  const userById = await user.findById(id);
  return userById;
}

async function deleteUserById(id) {
  await user.deleteOne({ id: id });
  return `usuário com id: ${id} foi deletado!`;
}

async function deleteAllUsers() {
  await user.deleteMany();
  return 'todos os usuários foram deletados!';
}

module.exports = {
  loginUserService,
  registerUserService,
  getAllUserByRole,
  getUserByIdService,
  deleteAllUsers,
  deleteUserById,
};
