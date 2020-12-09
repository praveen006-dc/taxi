const User=require("../models/user");
const path = require('path');
var jwt = require('jsonwebtoken');
var expressjwt=require('express-jwt');
var $ = require( "jquery" );
const _=require("lodash")
const nodemailer = require("nodemailer");
const user = require("../models/user");
const { updateuser } = require("./admin");


function randomId(length){
    let output = ''
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while(--length){
       output+= charset[(Math.random() * charset.length) << 0];
    }
    return output;
}

//console.log(randomId(24));

exports.getUserById=(req,res)=>{
    User.findOne({_id:req.params.userId}).then(user=>{
        //console.log(user)
        if(!user){
            return res.status(404).send({message:"No user found in DB"})
        }
        res.send(user)})
        .catch( err =>{
             res.status(400).send({ error:err.message })
        })
       /* if( err || !user){
            res.status(401).json({
                "err":"No User Found In DB"
            })
        } */
       // req.profile=user
        // next();
  //  next();
}

exports.updateUser= async(req,res, next)=>{
   var data= await User.findOneAndUpdate( { _id:req.params.userId },
    {$set:req.body},{upsert: true})
        data.then(data=>{
            if(!user){
                return res.status(404).send({message:"No user found in DB"})
            }
            res.send(user)
        })
            .catch( err =>{
                 res.status(400).send({ error:err.message })
            })
        
    
   /* if(!data)
   return res.send('something went wrong') */
    
   //   var data= await User.findOneAndUpdate({
       
//     _id:new mongoose.Types.ObjectId( req.params.userId)
// }, {
//     $set: req.body 
// }, {
//     upsert: true,
//     setDefaultsOnInsert: true,
// });
  /*  User.findOneAndUpdate(
        { _id:req.params.userId },
        {$set:req.body},
        { new:true },(err,updateuser)=>{
            
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this"
                })
            }

             res.send(updateuser); 

             
        } ) */
     console.log(data)
       res.send(data)
};

exports.delByUserId=(req,res,)=>{
    User.findByIdAndDelete(req.params.userId,(err)=>{
     if(err){
       return  res.status(404).json({
             message:"not able to delete the data"
         })
     }
       res.send({message:'deleted sucessfully'})
    })

}

exports.forgetPassword=(req,res)=>{
    User.findById(req.params.userId,(err,user)=>{
        if(err){
            res.status(404).json('Not able to reset the password')
        }

        user.password=req.body.password

        user.setPassword(user.password)
        res.send(user);
    })
}

exports.resetPassword=(req,res)=>{
    console.log('resetpassword',req.body)
    const { email }=req.body
   
    
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"user with this email does not exists"
            })
        }
        
        console.log(user) 
        const resetcode=randomId(25)
        //const token=jwt.sign({_id:user._id},process.env.RESET_PASSWORD_KEY,{expiresIn:'20m'})
         /* $(document).ready(function() {
            $("#myLink").on('click', doSubmit);
        });
        
        var doSubmit = function() {
            $("#myLink").off('click');
            // do things here
        }; */

        let mailTransporter = nodemailer.createTransport({ 
            service: 'gmail', 
            auth: { 
                user:process.env.GMAIL, 
                pass:process.env.PASSWORD
            } 
        }); 
          
      /*  let mailDetails = { 
            from: 'xyz@gmail.com', 
            to: 'abc@gmail.com', 
            subject: 'Test mail', 
            text: 'Node.js testing mail for GeeksforGeeks'
        }; 
          */
       
        const mailDetails ={
            from:'praveenmaan453@gmail.com',
            to:email,
            subject:'Reset Password Link',
            html:`<body>
            <h1>Please click on given link to reset your password</h1>
            
            <a href="${process.env.CLIENT_URL}/user/setpassword?resetcode=${resetcode}">click here to reset your password</a>
          
            </body>`
        }

        return user.updateOne({ resetcode:resetcode },(err,success)=>{
            if(err){
                return res.status(400).json({ error:'reset password link error'});
            }
            else{
                mailTransporter.sendMail(mailDetails, function(err, data) { 
                   if(err){
                       return res.json({ error:err.message})
                   }

                   return res.json({message:'Email has been sent,kindly follow the instructions'})
               })
            }


        })


    })
}

exports.setPassword=(req,res)=>{
    const { resetcode,newpass }=req.body;
    //   console.log(req.query.resetLink)
   // if(req.query.resetLink ){
     //   return res.status(400).json({message:"You have been password has changed"})
    //}
    //if(resetLink){}
  //  if(resetcode){
       /* jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY,(error,decoded)=>{
            if(error){
               return res.json(401).status({error:'Incorrect token or it is expired'})
            }*/
         console.log(resetcode)
            User.findOne({resetcode},(err,user)=>{
                
                if(err || !user){
                    return res.status(400).json({
                        error:"user with this email does not exists"
                    })
                
                }

             //   const obj={
               //     password: newpass,
                 //   resetcode:''
                //}
                user.password=newpass
                user.resetcode=null
            console.log(user.password)
              //  user=_.extend(user,obj)
              //  user.setPassword(user.password)
                //user.st
                user.save((err,result)=>{
                    if(err){
                        return res.status(400).json({ error:'reset password error'})
                    }else{
                         res.status(200).json({ status:200,message:'your password has been changed'})   
                    }
                   // if(result.status === 200){
                     //   return data.html=dis
                    //}
                }
                )
            })

        //})
  //  }

  //  else{
    //    return res.json(401).status({error:'Authentication error!!!!'})
    //}
}

exports.setPasswordUi=(req,res)=>{
// res.send("setpasswordui......................")    

   // res.sendFile(path.join(__dirname, '../views/forgotpassword.html'));
      console.log(req.query.resetcode)
    //  resetLink=req.query.resetLink
    //resetLink=user.resetLink
    User.findOne({ resetcode: req.query.resetcode  },(err,data)=>{
        if(err){
            return res.json(401).status({error:'Authentication error!!!!'})
        }
        else if(!data){
            console.log(data)
             res.json({message:'U have been already changed the password'})
        }
        else{
            console.log(data)
            res.sendFile(path.join(__dirname, '../views/forgotpassword.html'));
        }
    })
};

exports.getTemplate=(req,res)=>{
    return res.sendFile(path.join(__dirname,'../views/index.html'))
}

