const db = require('../database/db.js');

// retreive products
const select_products = db.prepare(/*sql*/ `
  SELECT id, name, quantity_per_unit, unit_price, units_in_stock, units_on_order FROM products
`);

const listProducts = () => {
  return select_products.all();
};

// search products
const search_products = db.prepare(/*sql*/ `
  SELECT id, name FROM products WHERE name LIKE '%' || ? || '%'
`);

const searchProducts = (searchString) => {
  return search_products.all(searchString);
};

// get specific product
const get_product = db.prepare(/*sql*/ `
  SELECT id, name FROM products WHERE id = ?
`);

const getProduct = (id) => {
  console.log(get_product.get(id));
  return get_product.get(id);
};

module.exports = { listProducts, searchProducts, getProduct };
