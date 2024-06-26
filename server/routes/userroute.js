const express=require('express');
const router=express.Router();
const {
registeruser,
logoutuser,
loginuser,
forgotpassword,
userdetail,
resetpassword,
updatePassword,
updateuserprofile,
getallusers,
getsingleuser,
deleteuser,
updateuser
}=require('../controller/usercontroller');
const {isAuthenticatd,authorizeRoles}=require('../middleware/auth');


router.route('/register').post(registeruser);
router.route('/login').post(loginuser); 
router.route('/logout').get(logoutuser)
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').put(resetpassword);
router.route('/me').get(isAuthenticatd,userdetail);
router.route('/password/update').put(isAuthenticatd,updatePassword);
router.route("/me/update").put(isAuthenticatd,updateuserprofile);
router.route('/admin/users').get(isAuthenticatd,authorizeRoles('Admin'),getallusers);
router.route('/admin/user/:id').get(isAuthenticatd,authorizeRoles('Admin'),getsingleuser).
delete(isAuthenticatd,authorizeRoles('Admin'),deleteuser).put(isAuthenticatd,authorizeRoles('Admin'),updateuser);
  


module.exports=router;