const { getUserById } = require('./user.service');
const connection = require('../connection/connection');

async function registerNewSale(saleFromReq) {
  const { products, ...saleWithoutProducts } = saleFromReq;
  const {
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    saleDate, 
    status,
  } = saleWithoutProducts;
  const result = await connection.execute(
    `INSERT INTO sales (user_id, seller_id, total_price, delivery_address, 
    delivery_number, sale_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId, 
      sellerId, 
      totalPrice,
      deliveryAddress, 
      deliveryNumber, 
      saleDate,
      status
    ]
  );
  const saleId = result.insertId;

  const salesProductsPromises = products.map(({ productId, quantity }) => {
    const sql = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const values = [saleId, productId, quantity];
    return connection.execute(sql, values);
  });

  await Promise.all(salesProductsPromises);
  return result[0]; // retorna o resultado da inserção na tabela 'sales'
}


async function allSaleService(id) {
  const user = await getUserById(id);

  if (user.role === 'seller') {
    const [result] = await connection.execute('SELECT * FROM sale WHERE id = ?', [id]);
    return result;
  } 
  const [rows] = await connection.execute(
    `SELECT sales.id, sales.user_id, sales.seller_id,
    sales.total_price, sales.delivery_address, sales.delivery_number,
    sales.sale_date, sales.status, users.name as userName
    FROM sales
    LEFT JOIN users ON sales.user_id = users.id
    WHERE sales.user_id = ?`,
    [id],
  );
  
  return rows;
}

async function updateState(status, id) {
  const updateQuery = 'UPDATE sales SET status = ? WHERE id = ?';
  const [rows] = await connection.execute(updateQuery, [status, id]);
  return rows;
}

module.exports = {
  registerNewSale,
  allSaleService,
  updateState,
};
