const mongoose=require("mongoose");

var usersSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
   type:String
    },
    phone:{
        type:String
    }
})

module.exports=mongoose.model("SomeUsers",usersSchema);