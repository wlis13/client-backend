const connection = require('../connections/connection');

async function findProductsQuantity(id) {
  const query = `
    SELECT s.id, s.total_value, s.created_at, p.name, p.price, sp.quantity
    FROM sales s
    INNER JOIN sale_products sp ON sp.sale_id = s.id
    INNER JOIN products p ON p.id = sp.product_id
    WHERE s.id = ?;
  `;
  const [results] = await connection.execute(query, [id]);
  return results;
}

module.exports = findProductsQuantity;
