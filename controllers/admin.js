const User=require("../models/user");
var jwt = require('jsonwebtoken');
var expressjwt=require('express-jwt');
const nodemailer = require("nodemailer");


exports.createuser=(req,res,next)=>{
    const user=new User(req.body);
     email=user.email
     password=user.password
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                message:'Not able to save user in DB'
            })
        }
        req.profile = user;
        res.json(user);
    })
 
    
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
        subject:'Admin',
        html:`<body>
        <h1>Admin created you with this email ${email} and password ${password}. use these credentials</h1>
        </body>`
      //  <a href="${process.env.CLIENT_URL}/user/setpassword?resetcode=${resetcode}">click here to //// //reset your password</a>
      
      
    }

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err){
            return res.json({ error:err.message})
        }

       // return res.json({message:'Email has been sent,kindly follow the instructions'})
    })

  /*  return user.updateOne({ resetcode:resetcode },(err,success)=>{
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


    }) */


    
}

exports.updateuser=(req,res)=>{
    //const user=new User(req.body);
    User.findByIdAndUpdate({_id:req.params.userId},{$set:req.body},{new:true},
    (err,user)=>{
     //   console.log("errr....",err)
       // console.log("user.....",user)
        if(err || !user){
            return res.status(400).json({message:"something went wrong or no user found in table"})
        }
        email=user.email
        console.log(email)
        res.send(user);
   
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
        subject:'Admin',
        html:`<body>
        <h1>Admin update your account</h1>
        </body>`
      //  <a href="${process.env.CLIENT_URL}/user/setpassword?resetcode=${resetcode}">click here to //// //reset your password</a>
      
      
    }

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err){
            return res.json({ error:err.message})
        }

        return res.json({message:'Email has been sent,kindly follow the instructions'})
    })

});
};

exports.getuser=(req,res)=>{
    User.findById({_id:req.params.userId}).
    exec((err,user)=>{
        if(err ||  !user){
            return res.send({ message:'No user found in table '})
        }
      
        res.send(user)
    })

   
};

exports.deluser=(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.userId}).
    exec((err,user)=>{
     //  console.log(err)
        if(err ||  !user){
            return res.send({ message:'No user found in table '})
        }
       // req.profile=users
       email=user.email
       console.log(email)
        user.isDeleted=true 
        user.save()
   
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
        subject:'Admin',
        html:`<body>
        <h1>Admin has been deleted your account ${req.body}</h1>
        </body>`
      //  <a href="${process.env.CLIENT_URL}/user/setpassword?resetcode=${resetcode}">click here to //// //reset your password</a>
      
      
    }

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err){
            return res.json({ error:err.message})
        }

     //   return res.json({message:'Email has been sent,kindly follow the instructions'})
    })
    res.send("Deleted Successfully")
});

};

exports.getalluser=(req,res)=>{
    User.find({role:"0" , isDeleted:"false" }).
    exec((err,users)=>{
        if(err ||  !users){
            return res.send({ error:err.message },{ message:'No users found in table '})
        }
      //  req.users.role=undefined

        return res.send(users);
    })
}
