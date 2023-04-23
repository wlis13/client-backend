const ExceptionWithErrorCode = require('../error/ExceptionWithErrorCode');
const { comparePasswords, hashPassword } = require('../utils/crypto');
const { generateToken } = require('../utils/jwt');
const connection = require('../connection/connection');

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
'SELECT * FROM Users WHERE email = ?',
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
'SELECT * FROM Users WHERE email = ? OR name = ?',
  [userFromReq.email, userFromReq.name],
);
  if (user) {
    throw new ExceptionWithErrorCode(409, 'User already exists');
  }
}

async function registerNewUser(userFromReq) {
  await validateUserAlreadyExists(userFromReq);
  const { name, email, role } = userFromReq;
  const passwordHash = hashPassword(userFromReq.password);
  const createdUser = await connection.execute(`INSERT INTO Users(name, email, password, role)
  VALUES
  (?,?,?,?)`, [
    name, email, passwordHash, role,
  ]);
  return createdUser;
}

async function getAllUserByRole(role) {
  const [rows] = await connection.execute(
    'SELECT * FROM Users WHERE role = ?',
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
  const user = await connection.execute('SELECT * FROM Users WHERE id = ?', [id]);
  return user;
}

module.exports = {
  loginUser,
  registerNewUser,
  getAllUserByRole,
  getUserById,
};
