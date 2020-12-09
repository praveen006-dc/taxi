const Driver=require('../models/driver');
//const booking = require('../models/booking');
//const driver = require('../models/driver');

exports.createdriver=(req,res)=>{
   const driver=new Driver(req.body);
   driver.save((err,driver)=>{
       console.log(err)
       if(err){
           res.status(404).json({message:'Not able to save user in DB'})
       }
       res.send(driver);
   })
};

exports.updatedriver=(req,res)=>{
    Driver.findOneAndUpdate({ _id:req.params.driverId},{ $set:req.body },{ new:true },(err,driver)=>{
        if(err || !driver){
            res.status(404).send(err)
        }
        res.send(driver)
    })
};

exports.deletedriver=(req,res)=>{
    Driver.findOneAndDelete({_id:req.params.driverId},(err,driver)=>{
        console.log(err)
        console.log(driver)
        if(err || !driver){
          return  res.status(400).send({message:'No driver able in DB, something went wrong '});
        }
        else{
        return  res.send({message:'Deleted Sucessfully'})
        }
    })
};

exports.getdriver=(req,res)=>{
    Driver.findOne({_id:req.params.driverId},(err,driver)=>{
        console.log(err)
        if(err || !driver ){
           return res.status(404).send({error:'Something went wrong'})
        }

        res.send(driver);
    })
}

exports.getAllDriver=(req,res)=>{
    Driver.find((err,drivers)=>{
        if(err){
            return res.status(404).send({error:'Something went wrong'})
        }
        res.send(drivers)
    })
}