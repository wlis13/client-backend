const connection = require('../connection/connection');

async function getAll() {
 const [result] = await connection.execute('SELECT * FROM products');
 return result;
}

module.exports = {
  getAll,
};