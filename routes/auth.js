const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const router = express.Router();
router.post('/',async(req,res)=>{
    var resp;
    const result =validateUser(req.body);
    if(result.error)

    {
        resp={status:400,error:true,message:result.error.details[0].message}
        return res.status(400).send(resp);
    }
    let user = await User.findOne({email:req.body.email});
    if(!user)
    {
        resp={status:400,error:true,message:"Invalid email or password"}
        return res.status(400).send(resp);
    };

  const validpassword =bcrypt.compareSync(req.body.password,user.password);
  if(!validpassword)
  {
      
    resp={status:400,error:true,message:"Invalid email or password"}
    return res.status(400).send(resp);

  }
  
   resp = {
       status:200,
       error:false,
       message:"Logged in successfully",
       data:{
        token:user.generateAuthtoken(),
        name:user.name,
        email:user.email,
        phone:user.phone,
        gender:user.gender,
        address:user.address,
        dateofcreation:user.dateofcreation

  
       }

   }
   
   const token = user.generateAuthtoken();

    res.header('x-auth-token',token).send(resp);

 })



 function validateUser(req)
{
    const Schema = Joi.object({
        
        email: Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(20).required(),
        
    }).options({abortEarly:false});
    return Schema.validate(req);
}

module.exports = router;