const express=require('express');
const router=express.Router();
// const isAuthenticatd = require('../middleware/auth');
const {
getallProduct,
createproduct,
updateproduct,
deleteproduct,
getsingleProduct,
createProductReview,
getproductReview,
deleteReview,
getAdminProducts
}=require('../controller/productcontroller');

const {isAuthenticatd,authorizeRoles}=require('../middleware/auth');

router.route("/product").get(getallProduct);

router.route("/review").put(isAuthenticatd,createProductReview);

router.route("/reviews").get(getproductReview).delete(isAuthenticatd,deleteReview);

router.route("/admin/product/new").post(isAuthenticatd,authorizeRoles("Admin") ,createproduct);

router.route("/admin/product/:id").put(isAuthenticatd,authorizeRoles("Admin"),updateproduct)
                                  .delete(isAuthenticatd,authorizeRoles("Admin"),deleteproduct);

router.route("/product/:id").get(getsingleProduct);

router.route("/admin/products").get(isAuthenticatd,authorizeRoles("Admin"),getAdminProducts);


module.exports=router;