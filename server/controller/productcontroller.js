const Product = require('../model/productmodel');
const ErrorHandler = require('../utils/errorhandlers');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');


// create new product => /api/v1/admin/product/new]

const createproduct= async(req,res,next)=>{
    try{
        let images=[];
        if(typeof req.body.images==='string'){
            images.push(req.body.images);
        }
        else{
            images=req.body.images;
        }
        let imagesLinks=[];
        for(let i=0;i<images.length;i++){
            const result=await cloudinary.v2.uploader.upload(images[i],{
                folder:'products'
            });
            imagesLinks.push({
                public_id:result.public_id,
                url:result.secure_url
            })
        }
        req.body.images=imagesLinks;
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
        const resultperPage=8;
        const productCount= await Product.countDocuments();
      const apiFeature= new  ApiFeatures ( Product.find(),req.query).search().filter().pagination(resultperPage);
        const product= await apiFeature.query;
    res.status(200).json({
        success:true,
        product,
        productCount,
        resultperPage
    })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
// get all product=> admin
const  getAdminProducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
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
   
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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
    products.images.forEach(async image => {
        await cloudinary.v2.uploader.destroy(image.public_id);
    });
    
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
deleteReview,
getAdminProducts
}