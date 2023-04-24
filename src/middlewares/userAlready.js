const connection = require("../connection/connection");

async function validateUserAlreadyExists(req, res, next) {
  const { email, name } = req.body;
  const user = await connection.execute(
'SELECT * FROM users WHERE email = ? OR name = ?',
  [email, name],
);
  if (user) {
    res.status(409).json({ message: 'User already exists'});
  } else { next(); }
}

module.exports = validateUserAlreadyExists;
