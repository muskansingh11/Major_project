const {Donor,validate} = require('../models/donor');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/',async(req,res)=>{
   // const result = validate(req.body);
    // if(result.error) 
    // {
    //     resp = {status:400,error:true,message:result.error.details[0].message};
    //     return res.status(400).send(resp);
    // }



   let  donor = new Donor({
        id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        phone:req.body.phone,
        location:req.body.location,
        bloodGroup:req.body.bloodGroup
        
    });

   
    await donor.save();

    resp = {
    status:200,
    error:false,
    message:"Data send successfully",
    data:{

        id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        phone:req.body.phone,
        location:req.body.location,
        bloodGroup:req.body.bloodGroup

    }}

    res.send(resp);

    
    
})

module.exports  = router;