const mongoose=require('mongoose')
//const User=require('../models/user');
const { ObjectId } = mongoose.Schema;


var bookingSchema= new mongoose.Schema({
    vehicletype:{
      type:String,
      required:true,
      trim:true
    },
    strt_point:{
        type:String,
        required:true,
        trim:true
    },

    end_point:{
        type:String,
        required:true,
        trim:true
    },
    rideprice:{
        type:Number,
        required:true,
        trim:true
    },
    customername:{
     type:String,
     trim:true
    },
    drivername:{
        type:String,
        trim:true
    },
    status: {
        type: String,
        default: "Reached",
        enum: ["Cancelled", "Initiated", "Reached"],
        trim:true
      },
      user:{
          type:ObjectId,
          ref:'User'
      },
      driver:{
        type:ObjectId,
        ref:'Driver'
      }
});

module.exports=mongoose.model("Booking",bookingSchema);