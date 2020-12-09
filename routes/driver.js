var express=require("express");
var router=express.Router();

const{ createdriver,
updatedriver,
deletedriver,
getdriver,
getAllDriver }=require('../controllers/driver');
router.post('/createDriver',createdriver);
router.put('/updateDriver/:driverId',updatedriver);
router.delete('/deleteDriver/:driverId',deletedriver);
router.get('/getDriver/:driverId',getdriver);
router.get('/getAllDriver',getAllDriver);




module.exports=router