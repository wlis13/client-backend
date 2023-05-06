const { generateToken } = require('../utils/jwt');
const path = require('path');
const fs = require('fs/promises');
const { hashPassword } = require('../utils/crypto');
const user = require('../models/users.model');

const PATH_USERS = "../../database/users.json";

async function loginUserService(userFromReq) {
  const getUser = await user.findOne({ email: userFromReq.email });
  const token = await generateToken(getUser);
  if (getUser !== null) {
  return { token };
  }
}

async function registerUserService(userFromReq) {
  const passwordHash = hashPassword(userFromReq.password);
  const insertNewUser = await user.create({ passwordHash, ...userFromReq });
  return insertNewUser;
}

async function getAllUserByRole(role) {
  const getUserByRole = await user.findOne({ role: role })
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

module.exports = {
  loginUserService,
  registerUserService,
  getAllUserByRole,
  getUserByIdService,
};
