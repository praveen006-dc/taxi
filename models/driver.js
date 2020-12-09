const mongoose=require('mongoose');

var driverSchema=new mongoose.Schema({
    drivername:{
      type:String,
      required:true,
      trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    vehicle:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Driver",driverSchema);