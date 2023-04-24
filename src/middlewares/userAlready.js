const connection = require("../connection/connection");

async function validateUserAlreadyExists(req, res, next) {
  const { email } = req.body;
  const [user] = await connection.execute(
'SELECT * FROM users WHERE email = ?',
  [email],
);
  if (user.length > 0) {
    res.status(409).json({ message: 'User already exists'});
  } else { next(); }
}

module.exports = validateUserAlreadyExists;
