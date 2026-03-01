/**
 * Fake Store API - https://fakestoreapi.com/products
 * Sin registro ni API key. Categorías: electronics, jewelery, men's clothing, women's clothing.
 */

const FAKE_STORE_URL = 'https://fakestoreapi.com';

const categoryMap = {
  "men's clothing": 'Men',
  "women's clothing": 'Women',
  electronics: 'Electronics',
  jewelery: 'Jewelery'
};

function mapProduct(item) {
  return {
    _id: String(item.id),
    name: item.title,
    description: item.description || '',
    price: Number(item.price),
    imageUrl: item.image,
    category: categoryMap[item.category] || item.category,
    sizes: ['One Size'],
    colors: ['Standard'],
    stock: item.rating?.count ?? 99
  };
}

async function fetchFakeStore(path) {
  const res = await fetch(`${FAKE_STORE_URL}${path}`);
  if (!res.ok) throw new Error(`Fake Store API: ${res.status}`);
  return res.json();
}

async function getAllProducts(categoryFilter) {
  const data = await fetchFakeStore('/products');
  const mapped = data.map(mapProduct);
  if (categoryFilter) {
    return mapped.filter((p) => p.category === categoryFilter);
  }
  return mapped;
}

async function getProductById(id) {
  const data = await fetchFakeStore(`/products/${id}`);
  if (!data || !data.id) return null;
  return mapProduct(data);
}

module.exports = { getAllProducts, getProductById };
