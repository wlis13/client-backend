const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.SECRET;

async function adminGuard(req, res, next) {
    const user = jwt.verify(req.headers.authorization, secret).dataValues;
    if (user.role === 'administrator') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = adminGuard;