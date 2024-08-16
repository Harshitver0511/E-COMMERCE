const Order=require('../model/ordermodel');
const Product=require('../model/productmodel');
// const ErrorHandler=require('../utils/errorhandlers');

const neworder=async(req,res,next)=>{
    try{
        const{shippingInfo
            ,orderitems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice}=req.body;
        const order=await Order.create({
            shippingInfo,
            orderitems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id
        });  
        res.status(200).json({
            success:true,
            order
        }) 


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getsingleorder=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id).populate('user','name email');
        if(!order){
            return next(new ErrorHandler(404,'Order not found with this id'));
        }
        res.status(200).json({
            success:true,
            order
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get logged in user orders => /api/v1/orders/me
const myorders=async(req,res,next)=>{
    try{
        const orders=await Order.find({user:req.user.id});
        res.status(200).json({
            success:true,
            orders
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all orders => /api/v1/admin/orders
const allorders=async(req,res,next)=>{
    try{
        const orders=await Order.find();
        let totalAmount=0;
        orders.forEach(order=>{
            totalAmount+=order.totalPrice;
        })
        res.status(200).json({
            success:true,
            totalAmount,
            orders
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// update order => /api/v1/admin/order/:id
const updateorder=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return next(new ErrorHandler(404,'Order not found with this id'));
        }
        if(order.orderStatus==='Delivered'){
            return next(new ErrorHandler(404,'Order already delivered'));
        }
        if (req.body.status === "Shipped") {
            order.orderitems.forEach(async (o) => {
              await updatestock(o.product, o.quantity);
            });
          }
        order.orderStatus=req.body.status;
    if(req.body.status==='Delivered'){
        order.deliveredAt=Date.now();
    }
        await order.save();
        res.status(200).json({
            success:true
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
 
async function updatestock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}


// delete order => /api/v1/admin/order/:id
const deleteorder=async(req,res,next)=>{
    try{
        const order=await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return next(new ErrorHandler(404,'Order not found with this id'));
        }
        res.status(200).json({
            success:true
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


module.exports={
    neworder,
    getsingleorder,
    myorders,
    allorders,
    updateorder,
    deleteorder
}