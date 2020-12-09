const Booking=require("../models/booking");
const { error } = require("jquery");
const booking = require("../models/booking");

exports.createbooking=(req,res)=>{
    const booking=new Booking(req.body);
  
    booking.save((err,booked)=>{
        console.log(err)
     if(err){
         res.status(400).send({error:'Something went wrong'})
     }
     res.send(booked)
    })
}

exports.updatebooking=(req,res)=>{
    Booking.findOneAndUpdate({_id:req.params.bookingId},{$set:req.body},{new:true},(err,booked)=>{
        console.log(err)
        if(err || !booked){
            res.status(400).send({error:'Something went wrong'})
        }
        res.send(booked)
    })
};

exports.deletebooking=(req,res)=>{
    Booking.findOneAndDelete({_id:req.params.bookingId},(err,booked)=>{
        if(err || !booked){
            res.status(400).send({ error:"Something went wrong "})

        }
        res.send({message:"Delete successfully"})
    })
};

exports.getbooking=(req,res)=>{
    Booking.findOne({_id:req.params.bookingId},(err,booked)=>{
        if(err || !booked){
          return  res.status(400).json({ error:"Something went wrong"})
        }

        res.send(booked)
    })
}
exports.getAllbooking=(req,res)=>{
    Booking.find((err,bookings)=>{
        if(err || !bookings){
          return  res.status(400).json({ error:"Something Went Wrong"})
        }

        res.send(bookings)
    })
}

exports.getuserallbooking=(req,res)=>{
    Booking.find({user:req.params.userId},(err,user)=>{
        console.log(user)
        if(err || !user){
            return res.status(400).json({ error:"Something Went Wrong"})
        }

        res.send(user)
    })
};
exports.getdriverallbooking=(req,res)=>{
    Booking.find({driver:req.params.driverId},(err,driver)=>{
        if(err || !driver){
            return res.status(400).json({ error:"Something Went Wrong"})
        }

        res.send(driver)
    })
}