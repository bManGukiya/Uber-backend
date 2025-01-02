const { validationResult } = require('express-validator');
const usermodel = require('../models/user.model');
const userservice = require('../services/user.service');


module.exports.registerUser = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     const {fullname,email,password} = req.body;

     const hashPassword = await usermodel.hashPassword(password);

     const user =await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
     });


     const token = user.generateJwtToken();

     res.status(201).json({token, user});
}

module.exports.loginUser = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await usermodel.findOne({email}).select('+password'); // find user and {+password means not get automoaticaly that reason in model in password fiels select:false}
    if(!user){
        return res.status(401).json({errors:[{msg:'Invalid email or password'}]});
    }

    const checkpassword = await user.comparePassword(password); // compare password

    //validation
    if (!checkpassword) {
        return res.status(401).json({errors:[{msg:'Invalid email or password'}]});
    }
    const token = user.generateJwtToken();
    
    // response
    res.status(200).json({token, user});
}