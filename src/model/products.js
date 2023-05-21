const db = require('../database/db.js');

// retreive products
const select_products = db.prepare(/*sql*/ `
  SELECT id, name, quantity_per_unit, printf('£%.2f', unit_price) as unit_price,
  units_in_stock, units_on_order, printf('£%.2f', unit_price * units_in_stock) AS stock_value FROM products
`);

const listProducts = () => {
  return select_products.all();
};

// create product
const insert_product_products = db.prepare(/*sql*/ `
  INSERT INTO products (name, quantity_per_unit, unit_price, category_id)
  VALUES ($name, $quantity_per_unit, $unit_price, $category_id)
  RETURNING id, name
`);

const createProduct = (product) => {
  return insert_product_products.get(product);
};

// search products
const search_products = db.prepare(/*sql*/ `
  SELECT id, name FROM products WHERE name LIKE '%' || ? || '%'
`);

const searchProducts = (searchString) => {
  return search_products.all(searchString);
};

// get specific product
const get_product_from_products = db.prepare(/*sql*/ `
  SELECT id, name FROM products WHERE id = ?
`);

const get_product_from_categories = db.prepare(/*sql*/ `
  SELECT name AS category_name, description AS category_description FROM categories WHERE id = ?
`);

const getProduct = (id) => {
  const products_product = get_product_from_products.get(id);
  const categories_product = get_product_from_categories.get(id);
  return { ...products_product, ...categories_product };
};

module.exports = { createProduct, listProducts, searchProducts, getProduct };
