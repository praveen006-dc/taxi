const SomeUsers=require('../models/users');
//const user = require('../models/user');
const Group=require('../models/group');
const { cssNumber, grep } = require('jquery');
const groups= require('../models/group');

exports.users=(req,res)=>{
    const someusers=new SomeUsers(req.body);

    someusers.save((err,users)=>{
        if(err){
            return  res.status(400).send({erro:' Something went wrong '})
        }

        req.user=users
     //   group.members=users._id
        const groups=new Group()
        groups.members=req.user._id
      group.save();
        res.send(users._id);
    })
}

exports.members=async (req,res)=>{

  
    // const group=new Group()
  // const { members} =req.group
//   {$match:{ members: { $in: ["5f3a105e46c43e0dc8518878",  "5f3a11083f83fa30140fad36","5f3a25e6cbab4425504e4314"] }}}

  /*const data = await group.aggregate( [ { $lookup:
        {
           from: "someusers",
          // localField: "_id",
            //foreignField: "members",
           pipeline: [
            { $match:
                { $expr:
                    [
            { $eq: [ "$_id","$members" ] }
            ]
        }}
        ,
           ],
         //  localField: "members",
         //  foreignField: "_id",
           as: "memberDetails"
        }
    } 
      //  group.members=users._id
        //group.save();
        //req.users.name=undefined,
        //req.users.email=undefined,
        //req.users.phone=undefined
     //   const { _id }=req.user._id
      // console.log(users._id)
        // return res.send(user)
       
 ])
    const data = await group.aggregate( [{ $lookup:
        {
           from: "group",
           localField: "members",
           foreignField: "_id",
           as: "memberDetails"
        }
    }]) */

   const data=await Group.aggregate([
   
        // {
        //   "$project": {
        //     "_id": {
        //       "$toString": "$_id"
        //     }
        //   }
        // },
       // { "$addFields": { "_id": { "$toString": "_id" }}},
    //    {$project: {"members": {
    //        "$toObjectId": "$members"} 
    //     }
    // },
   // {$match: {typet:'Req'}},
  //  {$project: {members:1}},
//   { "$addFields": { "userId": { "$toString": "$_id" }}},
//        {
//           "$lookup": {
//             "from": "someusers",
//             "localField": "members",
//             "foreignField": "userId",
//             "as": "members"
//           }
//         }
{ "$lookup": {
    "from": "someusers",
    "let": { "members": "$members" },
    "pipeline": [
     //  { "localField": "members"},
     //  { "foreignField": "_id"},
    //  { "$project": { "id": { "$toString": "$_id" }}},
      { "$addFields": { "userId": { "$toString": "$_id" }}},
      { "$match": { "$expr": { "$in": [ "$userId", "$$members" ] } } }
    ],
    "as": "output"
  }}
      ])
    res.send(data)
   // group.save();
   console.log('data',data);
   
}