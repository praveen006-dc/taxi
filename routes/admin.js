var express=require("express");
var router=express.Router();
const { 
createuser,
updateuser,
getuser,
deluser,
getalluser
}=require("../controllers/admin")
const { isSignedIn,isAuthenticated,isAdmin,isSubAdmin, isSubAdminNotAllow,isVerifyToken}=require("../controllers/authRoutes");



router.post("/createUser",isVerifyToken,isAuthenticated,isAdmin,createuser);
router.put("/updateUser/:userId",isVerifyToken,isAuthenticated,isAdmin,isSubAdminNotAllow,updateuser);
router.get("/getUser/:userId",isVerifyToken,isAuthenticated,isAdmin,isSubAdmin,getuser);
router.post("/deleteUser/:userId",isVerifyToken,isAuthenticated,isAdmin,isSubAdminNotAllow,deluser);
router.get("/getAllUser",isVerifyToken,isAuthenticated,isAdmin,isSubAdmin,getalluser);




  

module.exports=router