const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.auth;
    if(token){
        jwt.verify(token,'pos super secret token',(err,decodedTokem)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }else{
        res.redirect('/login');
    }   
}

module.exports = {requireAuth};