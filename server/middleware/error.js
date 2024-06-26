const ErrorHandler = require('../utils/errorhandlers');
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(404,message);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}