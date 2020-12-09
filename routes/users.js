var express=require("express");
var router=express.Router();

const { users,members }=require('../controllers/users')
router.post("/users",users);
router.post("/members",members)

module.exports=router