const mongoose = require("mongoose");

const orderInfoModel = new mongoose.Schema(
  {
    name: String,
    address: String,
    nearBy: String,
    city: String,
    state: String,
    pincode: String,
    products: Array,
    phone:String,
    email:String,
    
    date: Number,
    month: String,
    year: Number,
    paymentType: String,
    status: String,
    orderId: Number,
  },
  { timestamps: true }
);

const orderInfo = mongoose.model("orderInfo", orderInfoModel);
module.exports = orderInfo;