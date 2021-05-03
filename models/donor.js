const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const donorSchema =  new mongoose.Schema({
    id:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
      phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    location:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    bloodGroup:{
        type:String,
        required:true,
        minlength:1,
        maxlength:4


    }
    
 

})


const Donor = mongoose.model('Donor',donorSchema);
function validate(user)
{
    const Schema = Joi.object({
        id: Joi.string(),
        name:   Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(10).max(10).required(),
        location:Joi.string().min(3).max(50).required(),
        bloodGroup:Joi.string().min(1).max(4).required()
    }).options({abortEarly:false});
    return Schema.validate(user);
}

exports.Donor = Donor;
exports.validate = validate;