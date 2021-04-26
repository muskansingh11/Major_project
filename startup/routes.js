const users = require('../routes/users');
const auth =  require('../routes/auth');
//const donor = require("../routes/donor")
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const express = require('express');
module.exports = function(app)
{
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(upload.array());  

    
    app.use('/user',users);
    app.use('/auth',auth); 
    


}