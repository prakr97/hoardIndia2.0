const mongoose = require("mongoose");

const InquiryModel = new mongoose.Schema(
  {
    name: String,
    phone:String,
    email:String,
    reason:String
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("inquiry", InquiryModel);
module.exports = Inquiry;