const User=require("../models/user");
require('dotenv').config();
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");



exports.signup=(req,res)=>{
    const user=new User(req.body);
    console.log(user.password)
    user.password=user.setPassword(user.password)
    console.log(user.password)
    user.save((err,user)=>{
        if(err){
          console.log(err)
          return res.status(400).json({
            message:err})
        }
     req.profile=user
        res.json(user)

    })
};

exports.signin=(req,res)=>{
  const { email,password }=req.body
 

  User.findOne({email},(err,user)=>{
    if(err){
      console.log("errr,,,,",err)
      res.status(400).json({
        error:"USER email does not exists"
      })
    }
console.log(user)
    if(!user.authenticate(password)){
      // console.log("errr,,,,",user.authenticate(password))
    return  res.status(401).json({
        error:"email and password do not match"
      })
    }

   // create token
    const token=jwt.sign({_id:user._id},process.env.SECRET)
    // put token 1ST Arguments is token name, 2nd is value of token,3rd is option
    res.cookie("token",token,{ expire:new Date() + 9999 })
    // send response to front end 
    return res.json({token,user});
  })


}
//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ['HS256']
});

exports.isVerifyToken=(req,res,next)=>{
  const token=req.header('Authorization').replace('Bearer ',"");
  const decoded=jwt.verify(token,process.env.SECRET)
   req.decoded=decoded
  console.log(token)
  console.log(decoded)
 
  next();
}

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
 console.log(req.decoded)
 User.findOne({ _id:req.decoded } ,(err,user)=>{
  if(err){
    return res.status(400).json({ message:'Token is not valid or not verified'})
  }
  req['user']=user
  console.log(user)

  let checker = req.user && req.decoded && req.user._id == req.decoded._id;
    console.log(checker)

  // console.log(req.profile._id)
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
      });
    }
    next()
  //});
  })

};

exports.isAdmin = (req, res, next) => {
  console.log(req.user.role)
  if ( req.user.role === 0  ) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
 
  next();
};
exports.isSubAdmin=(req,res,next)=>{
  console.log(req.user.role)
  if((req.user.role === 0)){
    return res.status(403).json({
      error:"You are not admin or subadmin,Access denied"
    })
  }
  next();
}

exports.isSubAdminNotAllow=(req,res,next)=>{
  if ( (req.user.role === 2) ) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
 
  next();
}

