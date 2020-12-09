const express=require("express");
const router=express.Router();

const { getUserById,
updateUser,
delByUserId,
forgetPassword,
resetPassword,
setPassword,
setPasswordUi,getTemplate }=require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } =require("../controllers/authRoutes")

router.get("/:userId",getUserById);
//router.put("/:userId", isSignedIn,isAuthenticated,updateUser);
router.put("/:userId", updateUser);
router.delete("/:userId",delByUserId);
router.post("/forgotpassword/:userId",forgetPassword);
router.put("/resetpassword",resetPassword);
router.post("/setpassword",setPassword);
router.get("/setpassword",setPasswordUi);
router.get("/getTemplate",getTemplate);






module.exports=router