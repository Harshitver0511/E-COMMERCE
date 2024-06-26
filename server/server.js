const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path:'server/config/.env'});
process.on('uncaughtException',error=>{
  console.log(`Error:${error.message}`);
  console.log('Shutting down the server due to uncaught exception');
  server.close(()=>process.exit(1));
})
  
const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URI).then((data)=>{
  console.log(`Database connected ${data.connection.host}`); 
})
const server =app.listen(process.env.PORT,()=>{
  console.log('Server is running on port',process.env.PORT);
}); 
// m 
// handle uncaught exception

// unhandeled promise rejection
process.on('unhandledRejection',error=>{
  console.log(`Error:${error.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');
  server.close(()=>process.exit(1));
})
   


// eBwpPkUkdVJyMPOy