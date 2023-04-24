const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.SECRET;

async function generateToken(payload) {
  const token = jwt.sign({ ...payload }, secret, { algorithm: 'HS256' });
  return token;
}

module.exports = {
  generateToken,
};
