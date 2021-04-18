const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    var resp;
    if(!token) {
        resp = {status:401,error:true,message:"access denied.no token provided"};
        return res.status(401).send(resp);
    }
    try{
        const decoded = jwt.verify(token,'jwtprivatekey');
        console.log(decoded);
        req.user = decoded;
        console.log(req.user._id);
        next();
    }
    catch(ex)

    {
        resp = {status:400,error:true,message:"Invalid token"};
        res.status(400).send('Invalid Token');
    }
}
