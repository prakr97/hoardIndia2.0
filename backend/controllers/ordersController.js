const Inquiry = require('../models/inquiryModel');
const orderInfo = require('../models/orderInfoModel')

const createOrder = async(params) => {
    try{
        const totalEntries = await orderInfo.countDocuments();
        let month = new Date().getMonth() + 1; 
        if (month < 10) {
            month = '0' + month;
        }

        const updatedParams = {
            ...params,
            date: new Date().getDate(),
            month: parseInt(month),
            year:new Date().getFullYear(),
            paymentType: 'COD',
            status: 'Pending',
            orderId: `${new Date().getDate()}${month}${new Date().getFullYear()}${totalEntries+1}`,
        }
        console.log(updatedParams,'updatedParams')
        const order = await orderInfo.create(updatedParams)
        console.log(order,'order')
        return {status : 1, orderId: order?.orderId}
    }catch(err){
            return {status:0, message: "Error creating order!"}
    }
}
const fetchAllOrders = async () => {
    try {
        const result = await orderInfo.find({});
        return result
    } catch (error) {
            return {status:0, message: "Error fetching orders!"}

    }
};
const fetchSingleOrder = async ({orderId}) => {
    try {
        const result = await orderInfo.findOne({orderId: orderId});
        return result
    } catch (error) {
            return {status:0, message: "Error fetching orders!"}
    }
};

const createInquiry = async (params) => {
    try{
        const inquiry = await Inquiry.create(params)
        console.log(inquiry,'inquiry')
        return {status : 1, orderId: 'Inquiry submitted'}
    }catch(err){
        return {status:0, message: "Error creating inquiry!"}
    }
}

module.exports = { 
    createOrder,
    fetchAllOrders,
    fetchSingleOrder,
    createInquiry
 };