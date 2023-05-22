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
const select_product = db.prepare(/*sql*/ `
  SELECT
    products.id,
    products.name,
    categories.name AS category_name,
    categories.description AS category_description
  FROM products
  JOIN categories ON products.category_id = categories.id
  WHERE products.id = ?
`);

console.log(select_product);

function getProduct(id) {
  return select_product.get(id);
}

module.exports = { createProduct, listProducts, searchProducts, getProduct };
