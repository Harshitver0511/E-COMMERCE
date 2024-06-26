const express = require('express');
const router = express.Router();
const {isAuthenticatd,authorizeRoles}=require('../middleware/auth');
const {neworder,
    getsingleorder,
    myorders,
    allorders,
    updateorder,
    deleteorder,
    // processorder
}=require('../controller/ordercontroller');
router.route('/order/new').post(isAuthenticatd,neworder);
router.route('/order/:id').get(isAuthenticatd,authorizeRoles("Admin"),getsingleorder);
router.route('/orders/me').get(isAuthenticatd,myorders);
router.route('/admin/order/:id').put(isAuthenticatd,authorizeRoles("Admin"),updateorder);
router.route('/admin/order/:id').delete(isAuthenticatd,authorizeRoles("Admin"),deleteorder);
router.route('/admin/orders').get(isAuthenticatd,authorizeRoles("Admin"),allorders);


module.exports = router;