
const mongoose = require('mongoose');

let mongoURI = `mongodb+srv://hoard:hoard@cluster0.m6jje5c.mongodb.net/`;

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

