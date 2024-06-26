const ErrorHandler = require('../utils/errorhandlers');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');
const isAuthenticatd = async(req, res, next) =>{ 
    try{

        const {token}=req.cookies;
        if(!token){
            return next(new ErrorHandler(401,'Login first to access this resource'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

        
       
    }
    catch(error){
        console.log(error);
        return next(new ErrorHandler(401,'Login first to access this resource'));
    }
}   

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(403,`Role (${req.user.role}) is not allowed to access this resource`));
        }
        next();
    }
}

module.exports={
    isAuthenticatd,
    authorizeRoles
}