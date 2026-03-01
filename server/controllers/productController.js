const Product = require('../models/Product');
const fakeStore = require('../services/fakeStoreService');

const getAllProducts = async (req, res) => {
  try {
    // Combine Fake Store API products with MongoDB products
    const [fakeProducts, dbProducts] = await Promise.all([
      fakeStore.getAllProducts(req.query.category).catch(() => []),
      Product.find(req.query.category ? { category: req.query.category } : {}).lean()
    ]);

    // Mark source so frontend knows which are editable
    const fake = fakeProducts.map(p => ({ ...p, source: 'api' }));
    const db = dbProducts.map(p => ({ ...p, _id: String(p._id), source: 'db' }));

    res.json([...db, ...fake]);
  } catch (error) {
    console.error('Get products error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    // Try MongoDB first, then Fake Store API
    const dbProduct = await Product.findById(req.params.id).lean().catch(() => null);
    if (dbProduct) {
      return res.json({ ...dbProduct, _id: String(dbProduct._id), source: 'db' });
    }

    const fakeProduct = await fakeStore.getProductById(req.params.id);
    if (fakeProduct) {
      return res.json({ ...fakeProduct, source: 'api' });
    }

    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error('Get product error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ ...product.toObject(), _id: String(product._id), source: 'db' });
  } catch (error) {
    console.error('Create product error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ ...product.toObject(), _id: String(product._id), source: 'db' });
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
