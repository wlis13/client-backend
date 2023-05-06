const { generateToken } = require('../utils/jwt');
const path = require('path');
const fs = require('fs/promises');
const { hashPassword } = require('../utils/crypto');
const user = require('../models/users.model');

const PATH_USERS = "../../database/users.json";

async function loginUserService(userFromReq) {
  await user.findOne({ email: userFromReq.email });
  const token = await generateToken(getUser);
  if (getUser !== null) {
  return { token };
  }
}

async function registerUserService(userFromReq) {
  const insertNewUser = await user.create(userFromReq);
  return insertNewUser;
}

async function getAllUserByRole(role) {
  const fileUsers = path.join(__dirname, PATH_USERS);
  const createdUser = JSON.parse(await fs.readFile(fileUsers, "utf-8"));
  const rows = createdUser.filter((user) => user.role === role);

  const userList = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  }));

  return userList;
}

async function getUserByIdService(id) {
  const filePath = path.join(__dirname, PATH_USERS);
  const getUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userById = getUsers.find((user) => user.id === Number(id));
  return userById;
}

module.exports = {
  loginUserService,
  registerUserService,
  getAllUserByRole,
  getUserByIdService,
};
