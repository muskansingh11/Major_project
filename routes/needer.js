const {Donor,validate} = require('../models/donor');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',async(req,res)=>{
     
    var resp;
    const result = validateUser(req.body);
    if(result.error)

    {
        resp={status:400,error:true,message:result.error.details[0].message}
        return res.status(400).send(resp);
    }
    let bgroup = req.body.bloodGroup.toUpperCase();
    let loc = req.body.location.split(" ").join("").toUpperCase();
    let don ;
    switch(bgroup)
    {
        case "O-":   
        
        don =  await Donor.find().or([{bloodGroup:'O-'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
        break;

        case "O+":      
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'O+'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break;
  
        case "A-":   
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'A-'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break;  
        case "A+": 
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'O+'},{bloodGroup:'A-'},{bloodGroup:'A+'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break;     
        case "B-":   
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'B-'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break;    
        
        case "B+":
         don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'O+'},{bloodGroup:'B+'},{bloodGroup:'B+'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
        break;       
        case "AB-":
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'A-'},{bloodGroup:'B-'},{bloodGroup:'AB-'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break;       
        case "AB+":
        don =  await Donor.find().or([{bloodGroup:'O-'},{bloodGroup:'O+'},{bloodGroup:'A-'},{bloodGroup:'A+'},{bloodGroup:'B-'},{bloodGroup:'B+'},{bloodGroup:'AB-'},{bloodGroup:'AB+'}]).and([{location:loc}]).select({name:1,phone:1,location:1,bloodGroup:1});
         break; 
        default:  
        don = "Invalid blood group";
        break;
}
    
    resp = {
    status:200,
    error:false,
    message:"Data send successfully",
    data:{

      don

    }}

    res.send(resp);

    
    
})

function validateUser(req)
{
    const Schema = Joi.object({
        
        location:Joi.string().min(3).max(50).required(),
        bloodGroup:Joi.string().min(1).max(4).required()
        
    }).options({abortEarly:false});
    return Schema.validate(req);
}

module.exports  = router;