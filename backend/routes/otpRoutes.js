const express = require('express');
const router = require('express-promise-router')();
const otpController = require('../controllers/otpController');

router.post('/sendOtp', async (req, res) => {
    try {
      const result = await otpController.sendOtp(req.body.params);
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while sending otp' });
    }
  });

router.post('/verifyOtp', async (req, res) => {
    try {
      console.log(req.body,'verify body')
      let { otp, hash, phone } = req.body
      const result = await otpController.verifyOtp({ otp, hash, phone });
      res.status(200).json(result); 
    } catch (error) {
      res.status(500).json({ message:'Error while verifying otp' });
    }
  });

module.exports = router;