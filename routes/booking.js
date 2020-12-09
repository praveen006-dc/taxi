const express=require("express")
const router=express.Router()

const { 
createbooking,
updatebooking,
deletebooking,
getbooking,
getAllbooking,
getuserallbooking,
getdriverallbooking
 }=require('../controllers/booking')
router.post("/createBooking",createbooking);  
router.put("/updateBooking/:bookingId",updatebooking);  
router.delete("/deleteBooking/:bookingId",deletebooking);  
router.get("/getBooking/:bookingId",getbooking);
router.get("/getAllBooking",getAllbooking); 
router.get("/getUserAllBooking/:userId",getuserallbooking);
router.get("/getDriverAllBooking/:driverId",getdriverallbooking);






module.exports=router