const test = require('node:test');
const assert = require('node:assert');
const { listProducts } = require('../src/model/products.js');

test('listProducts() calculates the stock value', () => {
  const products = listProducts();
  const product = products[0];
  assert.match(product.stock_value, /702/g);
});
