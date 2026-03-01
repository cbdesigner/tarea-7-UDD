const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // No process.exit: el servidor sigue en pie aunque la DB falle (login/seed fallarán hasta que conecte)
    throw error;
  }
};

module.exports = connectDB;
