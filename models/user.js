const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema =  new mongoose.Schema({
    id:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true

    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        required:true,
        minlength:3,
        maxlength:6
    },
    address:{
        type:String,
        required:true,
        minlength:10,
        maxlength:50
    },
    dateofcreation:{
        type:String,
        minlength:10,
        maxlength:15
    },
 

})
userSchema.methods.generateAuthtoken = function()
{
    console.log(this._id);
    const token = jwt.sign({_id:this._id},'jwtprivatekey');
    return token;
}

const User = mongoose.model('User',userSchema);
function validate(user)
{
    const Schema = Joi.object({
        id: Joi.string(),
        name:   Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(200).required(),
        phone:Joi.string().min(10).max(10).required(),
        gender:Joi.string().min(3).max(6).required(),
        address:Joi.string().min(10).max(50).required(),
        dateofcreation:Joi.string().min(10).max(15),
    }).options({abortEarly:false});
    return Schema.validate(user);
}

exports.User = User;
exports.validate = validate;