const ExceptionWithErrorCode = require('../error/ExceptionWithErrorCode');
const { comparePasswords, hashPassword } = require('../utils/crypto');
const { generateToken } = require('../utils/jwt');
const connection = require('../connections/connection');

function validateLoginAttempt(userFromReq, userFromDB) {
  if (!userFromDB) {
    throw new ExceptionWithErrorCode(404, 'User not Found');
  }

  const passwordIsValid = comparePasswords(userFromReq.password, userFromDB.password);

  if (!passwordIsValid) {
    throw new ExceptionWithErrorCode(400, 'Invalid User');
  }
}

async function loginUser(userFromReq) {
  const userFromDB = await connection.execute(
'SELECT * FROM users WHERE email = ?',
  [userFromReq.email],
);

  validateLoginAttempt(userFromReq, userFromDB);

  const token = await generateToken(userFromDB);
  const user = userFromDB.dataValues;
  delete user.password;
  return { ...user, token };
}

async function validateUserAlreadyExists(userFromReq) {
  const user = await connection.execute(
'SELECT * FROM users WHERE email = ? OR name = ?',
  [userFromReq.email, userFromReq.name],
);
  if (user) {
    throw new ExceptionWithErrorCode(409, 'User already exists');
  }
}

async function registerNewUser(userFromReq) {
  const { name, email, password, role } = userFromReq;
  const passwordHash = hashPassword(password);
  const createdUser = await connection.execute(`INSERT INTO users(name, email, password, role)
  VALUES
  (?,?,?,?)`, [
    name, email, passwordHash, role,
  ]);
  return createdUser;
}

async function getAllUserByRole(role) {
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE role = ?',
    [role],
  );

  const userList = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  }));

  return userList;
}

async function getUserById(id) {
  const user = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
  return user;
}

module.exports = {
  loginUser,
  registerNewUser,
  getAllUserByRole,
  getUserById,
};
