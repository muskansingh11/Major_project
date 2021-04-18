const mongoose = require('mongoose');
module.exports = function()
{
    // const connection = "mongodb+srv://Muskan:muskan1105@cluster0.tmgr3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose
    .connect("mongodb://127.0.0.1/majorpro",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected Successfully ... hurray "))
    .catch(err => console.log(err));
}
