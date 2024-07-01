
const express=require('express');
const app=express();
const cors=require('cors');
const errorhandler=require('./middleware/error');
const cookieparser=require('cookie-parser');
app.use(cookieparser());
app.use(express.json());
app.use(cors());
// route imoport
const productroute=require('./routes/productroute');
const userroute=require('./routes/userroute');
const orderroute=require('./routes/orderroute');
app.use('/api/v1',productroute);
app.use("/api/v1",userroute);
app.use("/api/v1",orderroute);



// middleware to handle error
app.use(errorhandler);
module.exports=app;
