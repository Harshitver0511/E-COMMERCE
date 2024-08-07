const Product = require('../model/productmodel');
const ErrorHandler = require('../utils/errorhandlers');
const User = require('../model/usermodel');
const crypto = require('crypto');
const sendTokenResponse = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary');
const registeruser= async(req,res,next)=>{
    try{
        const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatars',
            width:150,
            crop:'scale'
        });
        const {name,email,password}=req.body;
        const user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            }
        }); 
        sendTokenResponse(user,201,res);




    }
    catch(error){
        if(error.code===11000){
            return next(new ErrorHandler(400,'Duplicate Email entered'));
        }
        if(error.name==='JsonWebTokenError'){
            return next(new ErrorHandler(404,'Password reset token is invalid'));
        }
        if(error.name==='TokenExpiredError'){
            return next(new ErrorHandler(404,'Password reset token has been expired'));
        }
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })

    }

}

// login user => /api/v1/login
 const loginuser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return next(new ErrorHandler(400,'Please enter email and password'));
        }
        const user=await User.findOne({email}).select('+password');
        if(!user){
            return next(new ErrorHandler(401,'Invalid Email or Password'));
        }
        const isPasswordMatched=await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler(401,'Invalid Email or Password'));
        }
        sendTokenResponse(user,200,res);

    }
    catch(error){
        if(error.name==='JsonWebTokenError'){
            return next(new ErrorHandler(404,'Password reset token is invalid'));
        }
        if(error.name==='TokenExpiredError'){
            return next(new ErrorHandler(404,'Password reset token has been expired'));
        }
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//logout user => /api/v1/logout
const logoutuser=async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        });
        res.status(200).json({
            success:true,
            message:'Logged out'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
// forgot password

const forgotpassword=async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(new ErrorHandler(404,'User not found with this email'));

        }
        // get reset token
        const resetToken=user.getResetPasswordToken();
        await user.save({validateBeforeSave:false});
        // create reset password url
        const reseturl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
        const message=`Your password reset token is as follows :\n\n${reseturl}\n\nIf you have not requested this email, then ignore it`;
        try{
            await sendEmail({
                email:user.email,
                subject:'Ecommerce Password Recovery',
                message
            });
            res.status(200).json({
                success:true,
                message:`Email sent to:${user.email}`
            });
        }
        catch(error){
            console.log(error);
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save({validateBeforeSave:false});
            return next(new ErrorHandler(500,error.message));
            
        }


    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
const resetpassword=async(req,res,next)=>{
    try{
        //hash url token
        const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        });
        if(!user){
            return next(new ErrorHandler(404,'Password reset token is invalid or has been expired'));
        }
        if(req.body.password!==req.body.confirmpassword){
            return next(new ErrorHandler(400,'Password does not match'));
        }
        // setup new password
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        sendTokenResponse(user,200,res);

    }
    catch(error){
        if(error.name==='JsonWebTokenError'){
            return next(new ErrorHandler(404,'Password reset token is invalid'));
        }
        if(error.name==='TokenExpiredError'){
            return next(new ErrorHandler(404,'Password reset token has been expired'));
        }
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }

}

 const userdetail = async (req, res, next) => {
    try {
        const user=await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
} 
const updatePassword = async (req, res, next) => {
    try {
        const user=await User.findById(req.user.id).select('+password');
        const isMatched=await user.comparePassword(req.body.oldpassword);
        if(!isMatched){
            return next(new ErrorHandler(404,'Old password is incorrect'));
        }
        if(req.body.newpassword!==req.body.confirmpassword){
            return next(new ErrorHandler(404,'Password does not match'));
        }
        user.password=req.body.newpassword;
        await user.save();
        sendTokenResponse(user,200,res);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
} 
const updateuserprofile=async(req,res,next)=>{
    try{
        const newuserdata={
            name:req.body.name,
            email:req.body.email
        }
        if(req.body.avatar!==''){
            const user=await User.findById(req.user.id);
            const image_id=user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(image_id);
            const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
                folder:'avatars',
                width:150,
                crop:'scale'
            });
            newuserdata.avatar={
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            }
        }    
        const user=await User.findByIdAndUpdate(req.user.id,newuserdata,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success:true
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


//get all users => /api/v1/admin/users
const getallusers=async(req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            success:true,
            users
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
// get single user from admin => /api/v1/admin/user/:id
const getsingleuser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(404,`User not found with id:${req.params.id}`));
        }
        res.status(200).json({
            success:true,
            user
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// update user role =--admin => /api/v1/admin/user/:id
const updateuser=async(req,res,next)=>{
    try{
        const newuserdata={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }
        const user=await User.findByIdAndUpdate(req.user.id,newuserdata,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success:true
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
// delete user => /api/v1/admin/user/:id
const deleteuser=async(req,res,next)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return next(new ErrorHandler(404,`User not found with id:${req.params.id}`));
        }
        // await user.remove();
        res.status(200).json({
            success:true,
            message:'User deleted successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    loginuser,
    registeruser,
    logoutuser,
    forgotpassword,
    resetpassword,
    userdetail,
    updatePassword,
    updateuserprofile,
    getallusers,
    getsingleuser,
    updateuser,
    deleteuser
}