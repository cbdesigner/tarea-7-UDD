const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login: user not found for email', email?.trim());
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login: wrong password for', email?.trim());
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('Login OK:', email?.trim());
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const DEMO_EMAIL = 'demo@urbanthreads.com';
const DEMO_PASSWORD = 'demo123';

const seedDemoUser = async (req, res) => {
  try {
    const existing = await User.findOne({ email: DEMO_EMAIL });
    if (existing) {
      return res.json({ message: 'Demo user already exists. Use email: demo@urbanthreads.com, password: demo123' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, salt);
    await User.create({ name: 'Demo User', email: DEMO_EMAIL, password: hashedPassword });
    res.json({ message: 'Demo user created. Use email: demo@urbanthreads.com, password: demo123' });
  } catch (error) {
    console.error('Seed demo user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getUser, seedDemoUser };
