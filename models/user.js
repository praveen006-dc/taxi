const mongoose=require("mongoose");
const crypto = require('crypto');
const  uuidv1= require('uuid/v1');

var userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
     type:String,
    //  required:true,
    //  unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
     type:Number,
     default:0
    },
    contactNo:{
        type:Number
    },
    resetLink:{
        data:String,
        default:''
    },
    resetcode:{
        data:String,
        default:''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})


userSchema.methods={
    authenticate: function(plainpassword){
        
        console.log("lll,l,",this.password,this.setPassword(plainpassword),this.setPassword(plainpassword) == this.password)
     return  this.setPassword(plainpassword) === this.password
    },
    setPassword: (plainpassword)=>{
        this.salt=plainpassword
        if(!plainpassword) return "Plainpassword is missing"
        try{
            // this.password = Buffer.from(plainpassword).toString('hex')
           //this.save()
           return crypto
           .createHmac("sha256", this.salt)
           .update(plainpassword)
           .digest("hex");

        } catch(err){
         return ""
        }
    }
}

module.exports=mongoose.model("User",userSchema);