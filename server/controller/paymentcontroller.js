const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);
const ErrorHandler = require('../utils/errorhandlers');

exports.processPayment = async (req, res,next) => {
    try{
        const mypayment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:'inr',
            metadata:{company:"Ecommerce"},
        });
        res.status(200).json({
            success: true,
            client_secret: mypayment.client_secret,
        });
    

    }
    catch(error){
        return next(new ErrorHandler(error.statusCode,error.message));
    }
}
exports.sendStripeApiKey = async (req, res,next) => {
   try{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
   }
    catch(error){
     return next(new ErrorHandler(error.statusCode,error.message));
    }
}