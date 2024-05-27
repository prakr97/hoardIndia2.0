const express = require('express');
const connectDB = require('./dbConnection.js');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes.js')
const otpRoutes = require('./routes/otpRoutes.js')
const path = require('path');


// console.log(__dirname)
const corsOptions = {
  origin: 'http://5.161.224.84', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
// const chartRoutes = require('./routes/chartRoutes.js')
const app = express();
const PORT = 5000;

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

app.use('/order', orderRoutes);
app.use('/otp', otpRoutes)

// app.use(express.static(path.join(__dirname, '/frontend/dist')))

// app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '/frontend/dist/index.html')))
app.get('/', (req, res) => {
  res.send('Hello World test!!');
});

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server is running.`);
});

connectDB()

