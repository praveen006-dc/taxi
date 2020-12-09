require("dotenv").config();
const express=require("express");
const _=require('lodash')
const bodyparser=require("body-parser");
const cookieParser=require("cookie-parser")
const cors=require("cors")
const mongoose=require("mongoose");
var uuid = require('uuid');
const authRoutes=require("./routes/authRoutes");
const user=require("./routes/user")
const admin=require("./routes/admin");
const driver=require("./routes/driver");
const booking=require("./routes/booking");
const task=require("./routes/users")
const app=express();




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true }))
app.use(cookieParser());
app.use(cors());
//app.use(uuid())


//myroutes
app.use("/booking",booking)
app.use("/driver",driver)
app.use("/admin",admin)
app.use("/api",authRoutes);
app.use("/user",user)
app.use("/task",task)


// database connectivity
mongoose.connect('mongodb://localhost:27017/task',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
}).then((req,res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

 app.get('/',(req,res)=>{
     res.json("Hello how are you");
 })

app.listen(5000,(req,res)=>{
    console.log("Server is running on 5000 port");
})