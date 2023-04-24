const connection = require('../connection/connection');

async function getAll() {
 const [result] = await connection.execute('SELECT * FROM Products');
 return result;
}

module.exports = {
  getAll,
};