const {User,validate} = require('../models/user');
const auth = require('../middleware/auth.js');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/me',auth, async(req,res) => {
    const user = await  User.findById(req.user._id);
    var resp;
    if(!user)
    {
        resp = {status:400,error:true,message:"Something went wrong"};
        return res.send(resp);

    }
     resp = {status:200,
        error:false,
        message:"logged user information",
        data:{
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            gender:user.gender,
            address:user.address,
            dateofcreation:user.dateofcreation

        }
    }
    res.send(resp);
})


router.post('/',async(req,res)=>{
    const result = validate(req.body);
    var resp;
    if(result.error) 
    {
        resp = {status:400,error:true,message:result.error.details[0].message};
        return res.status(400).send(resp);
    }
    let user = await User.findOne({email:req.body.email});
    if(user)
    {
        resp = {status:400,error:true,message:"user already registered"};

        return res.status(400).send(resp);
    }


    user = new User({
        id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        gender:req.body.gender,
        address:req.body.address,
        dateofcreation:req.body.dateofcreation
        
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    resp = {
    status:200,
    error:false,
    message:"Data send successfully",
    data:{
        id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        address:req.body.address,
        dateofcreation:req.body.dateofcreation

    }}

    res.send(resp);

    
    
})

module.exports  = router;