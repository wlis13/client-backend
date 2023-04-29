const { generateToken } = require('../utils/jwt');
const path = require('path');
const fs = require('fs/promises');
const { hashPassword } = require('../utils/crypto');

const PATH_USERS = "../../database/users.json";

async function loginUserService(userFromReq) {
  const fileUsers = path.join(__dirname, PATH_USERS);
  const dataUsers = JSON.parse(await fs.readFile(fileUsers, "utf-8"));
  const getUser = dataUsers.find((user) => user.email === userFromReq.email);
  if (getUser) {
    const token = await generateToken(getUser);
    return  token;
  } else { return false }
}

async function registerUserService(userFromReq) {
  const { password } = userFromReq;
  const passwordHash = hashPassword(password);
  const fileUsers = path.join(__dirname, PATH_USERS);
  const createdUser = JSON.parse(await fs.readFile(fileUsers, "utf-8"));
  const id = createdUser.length + 1
  createdUser.push({ id, ...userFromReq, password_hash: passwordHash });
  await fs.writeFile(fileUsers, JSON
    .stringify(createdUser));
  return createdUser.find((user) => user.email === userFromReq.email);
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
