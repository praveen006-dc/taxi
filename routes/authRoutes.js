var express=require("express");
var router=express.Router();
const { check , validationResult }=require("express-validator")
const { signup,
signin,
isSignedIn,isAuthenticated,isAdmin }=require("../controllers/authRoutes")
const { createuser } =require("../controllers/user")


router.post("/signup",
[check("email","email is required").isEmail(),
 check("password","password filed is required").isLength({ min:1 })
],signup);

router.post("/signin",
[ check ("email","email is required").isEmail(),
  check("password","password filed is required").isLength({ min:1})
  ],signin);

//router.post("/admin/createUser",isSignedIn,isAuthenticated,isAdmin,createuser);
  

module.exports=router;