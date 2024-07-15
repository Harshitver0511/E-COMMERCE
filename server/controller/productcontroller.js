const Product = require('../model/productmodel');
const ErrorHandler = require('../utils/errorhandlers');
const ApiFeatures = require('../utils/apifeatures');

// create new product => /api/v1/admin/product/new]

const createproduct= async(req,res,next)=>{
    try{
        req.body.user=req.user.id;
        const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const getallProduct= async(req,res,next)=>{
    try{
        const pagination=8;
        const productCount= await Product.countDocuments();
      const apiFeature= new  ApiFeatures ( Product.find(),req.query).search().filter().pagination(pagination);
        const product= await apiFeature.query;
    res.status(200).json({
        success:true,
        product,
        productCount
    })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
// get single product details => /api/v1/product/:id
const getsingleProduct=async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler(404,'Product not found'));
    }
    res.status(200).json({
        success:true,
        product
    })
    }
    catch(error){
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`;
            return next(  new ErrorHandler(400,message));
        }
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// update product details => /api/v1/product/:id

const updateproduct=async(req,res,next)=>{
   try{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler(404,'Product not found'));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
   }
    catch(error){
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`;
            return next(  new ErrorHandler(400,message));
        }
        res.status(400).json({
            success:false,
            message:error.message
        })
}
}
// delete product => /api/v1/product/:id

 const deleteproduct=async(req,res,next)=>{
   try{
    let products = await Product.findById(req.params.id);
    if(!products){
        return next(new ErrorHandler(404,'Product not found'));
    }
    let product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:'Product is deleted'
    })
   }
   catch(error){
    if (error.name === 'CastError') {
        const message = `Resource not found. Invalid: ${error.path}`;
        return next(  new ErrorHandler(400,message));
    }
    res.status(400).json({
        success:false,
        message:error.message
    })

   }
}

// create a review or udate review => 

 const createProductReview = async (req, res,next) => {
    try{
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }
        const product = await Product.findById(productId);
        const isreviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        );
        if(isreviewed){
            product.reviews.forEach(review => {
                if(review.user.toString() === req.user._id.toString()){
                    review.comment = comment;
                    review.rating = rating;
                }
            });

        }
        else{
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
        }
        let avg=0;
        product.reviews.forEach(review => {
            avg+=review.rating;
        });
        product.ratings=avg/product.reviews.length;
        
        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true
        })


    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
 }; 
}  

// get all reivew of a product => 
    const getproductReview=async(req,res,next)=>{
        try{
            const product = await Product.findById(req.query.id);
            if(!product){
                return next(new ErrorHandler(404,'Product not found'));
            }
            res.status(200).json({
                success:true,
                reviews:product.reviews
            })
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    
 }

 //delete review => 

    const deleteReview=async(req,res,next)=>{
        try{
            const product = await Product.findById(req.query.productId);
            if(!product){
                return next(new ErrorHandler(404,'Product not found'));
            }
            const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
        //     let avg=0;  
        //     reviews.forEach(review => {
        //         avg+=review.rating;
        //     });
        //    let ratings=avg/reviews.length;
        //     let numReviews=reviews.length;
        //     await Product.findByIdAndUpdate(req.query.productId,{
        //         reviews,
        //         ratings,
        //         numReviews
        //     },{
        //         new:true,
        //         runValidators:true,
        //         useFindAndModify:false
        //     });
        let avg=0;
        product.reviews.forEach(review => {
            avg+=review.rating;
        });
        product.ratings=avg/product.reviews.length;
        product.reviews=reviews;
        product.numReviews=reviews.length;
        await product.save({validateBeforeSave:false});
        
            res.status(200).json({
                success:true
            })
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }

module.exports={
getallProduct,
createproduct,
updateproduct,
deleteproduct,
getsingleProduct,
createProductReview,
getproductReview,
deleteReview
}