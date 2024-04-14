const express = require('express');
const router = require('express-promise-router')();
const ordersController = require('../controllers/ordersController')

router.post('/createOrder', async (req, res) => {
    try {
      const {name, address, nearBy, city, state, pincode, products, phone, email} = req.body
      const result = await ordersController.createOrder({name, address, nearBy, city, state, pincode, products, phone, email});
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while fetching data' });
    }
  });

router.get('/fetchAllOrders', async (req, res) => {
    try {
      const result = await ordersController.fetchAllOrders();
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while fetching data' });
    }
  });

router.post('/fetchSingleOrder', async (req, res) => {
    try {
      const {orderId} = req.body
      console.log(req.body)
      console.log(orderId, '-----orderId')
      const result = await ordersController.fetchSingleOrder({orderId});
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while fetching data' });
    }
  });

  router.post('/createInquiry', async (req, res) => {
    try {
      const {name, phone, email, reason} = req.body
      const result = await ordersController.createInquiry({name, phone, email, reason});
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while fetching data' });
    }
  });

module.exports = router;