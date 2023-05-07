const { generateToken } = require('../utils/jwt');
const { hashPassword } = require('../utils/crypto');
const user = require('../models/users.model');
const mongoose = require('mongoose');

async function loginUserService(userFromReq) {
  const getUser = await user.findOne({ email: userFromReq.email });
  const token = await generateToken(getUser);
  if (getUser !== null) {
  return { token };
  }
}

async function registerUserService(userFromReq) {
  const passwordHash = hashPassword(userFromReq.password);
  const getAllUsers = await user.find();
  const constructorId = getAllUsers.length + 1;
  const insertNewUser = await user
    .insertOne({_id: constructorId.toString(), passwordHash, ...userFromReq });
  return insertNewUser;
}

async function getAllUserByRole(role) {
  const getUserByRole = await user.findOne({ role: role })
  const userList = getUserByRole.map((row) => ({
    _id: row._id,
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
  await user.deleteOne({ _id: id });
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
