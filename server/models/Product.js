const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Accessories', 'Shoes']
  },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
