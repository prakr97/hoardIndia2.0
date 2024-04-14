const express = require('express');
const connectDB = require('./dbConnection.js');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes.js')
const otpRoutes = require('./routes/otpRoutes.js')
const path = require('path');


// console.log(__dirname)

// const chartRoutes = require('./routes/chartRoutes.js')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/order', orderRoutes);
app.use('/otp', otpRoutes)

// app.use(express.static(path.join(__dirname, '/frontend/dist')))

// app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '/frontend/dist/index.html')))


app.listen(PORT, () => {
  console.log(`Server is running.`);
});

connectDB()

