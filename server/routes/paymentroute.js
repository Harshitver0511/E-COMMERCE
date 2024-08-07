const express=require('express');
const router = express.Router();
const {processPayment,sendStripeApiKey} = require('../controller/paymentcontroller');
const { isAuthenticatd } = require('../middleware/auth');

router.route('/payment/process').post(isAuthenticatd,processPayment);
router.route('/stripeapi').get(isAuthenticatd,sendStripeApiKey);
module.exports = router;