const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'Premium cotton crew neck t-shirt. Comfortable everyday essential with a relaxed fit.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    stock: 50
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch denim for maximum comfort and style.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    category: 'Men',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Dark Gray'],
    stock: 35
  },
  {
    name: 'Bomber Jacket',
    description: 'Lightweight bomber jacket with ribbed cuffs and hem. Perfect for layering.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    stock: 20
  },
  {
    name: 'Floral Summer Dress',
    description: 'Light and breezy floral print dress perfect for warm days. Features a flattering A-line silhouette.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Pink', 'Floral Blue'],
    stock: 25
  },
  {
    name: 'High-Waist Leggings',
    description: 'Ultra-soft high-waist leggings with four-way stretch. Great for workouts or casual wear.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    stock: 40
  },
  {
    name: 'Oversized Knit Sweater',
    description: 'Cozy oversized knit sweater with dropped shoulders. The perfect layering piece for cooler days.',
    price: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    colors: ['Cream', 'Beige', 'Light Pink'],
    stock: 30
  },
  {
    name: 'Canvas Sneakers',
    description: 'Classic low-top canvas sneakers with rubber sole. Versatile and comfortable for everyday wear.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400',
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red'],
    stock: 45
  },
  {
    name: 'Leather Boots',
    description: 'Durable leather ankle boots with side zip. Stylish and rugged for any season.',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400',
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black'],
    stock: 15
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight mesh running shoes with cushioned sole for optimal performance and comfort.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Blue/Gray', 'Red/Black'],
    stock: 30
  },
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt with brushed metal buckle. A timeless accessory for any outfit.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400',
    category: 'Accessories',
    sizes: ['S', 'M', 'L'],
    colors: ['Brown', 'Black'],
    stock: 60
  },
  {
    name: 'Sunglasses',
    description: 'UV400 polarized sunglasses with classic aviator frame. Stylish eye protection.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Gold/Brown', 'Silver/Gray', 'Black'],
    stock: 50
  },
  {
    name: 'Canvas Backpack',
    description: 'Durable canvas backpack with padded laptop compartment and multiple pockets.',
    price: 54.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Gray', 'Navy', 'Olive'],
    stock: 25
  }
];

const DEMO_USER = {
  name: 'Demo User',
  email: 'demo@urbanthreads.com',
  password: 'demo123'
};

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('Seed data: 12 products inserted successfully');
    } else {
      console.log(`Seed data: ${count} products already exist, skipping`);
    }
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};

const seedUsers = async () => {
  try {
    const existing = await User.findOne({ email: DEMO_USER.email });
    if (existing) {
      console.log('Seed data: demo user already exists, skipping');
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEMO_USER.password, salt);
    await User.create({ name: DEMO_USER.name, email: DEMO_USER.email, password: hashedPassword });
    console.log('Seed data: demo user created (demo@urbanthreads.com / demo123)');
  } catch (error) {
    console.error('Error seeding demo user:', error.message);
  }
};

module.exports = { seedProducts, seedUsers };
