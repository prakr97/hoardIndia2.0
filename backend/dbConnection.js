
require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_CONNECTION_STRING;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = connectDB;

