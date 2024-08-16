
const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const errorhandler=require('./middleware/error');
const cookieparser=require('cookie-parser');
const bodyparser=require('body-parser');
const fileupload=require('express-fileupload');
dotenv.config({path:'server/config/.env'});
app.use(cookieparser());

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());
app.use(express.json({ limit: '50mb' }));

// Set a larger limit for URL-encoded data (if you're using forms)
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// route imoport
const productroute=require('./routes/productroute');
const userroute=require('./routes/userroute');
const orderroute=require('./routes/orderroute');
const paymentroute=require('./routes/paymentroute');
app.use('/api/v1',productroute);
app.use("/api/v1",userroute);
app.use("/api/v1",orderroute);
app.use("/api/v1",paymentroute);




// middleware to handle error
app.use(errorhandler);
module.exports=app;
