const mongoose=require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
var groupSchema=new mongoose.Schema({
    members:[{
        type: String
    }]
});

module.exports=mongoose.model("Group",groupSchema);