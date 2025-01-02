const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authuser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //req.cookies.token not get token without cookie-parser module
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    const isblacklisted = await usermodel.findOne({token:token});
    if(isblacklisted){
        return res.status(401).json({message : "Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);
        
        req.user = user;

        return next();
    }
    catch(err){
        return res.status(401).json({message : "Unauthorized"});
    }
}