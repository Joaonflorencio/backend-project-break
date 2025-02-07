require('dotenv').config(); 
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Encerrar o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB;