const blacklistTokenModel = require('../models/blacklistToken.model');
const captainmodel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname,email,password,vehicle} = req.body;

    const iscaptain = await captainmodel.findOne({email});
    if(iscaptain){
        return res.status(400).json({message : "Captain already exists"});
    }
    const hashPassword = await captainmodel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicaltype: vehicle.vehicaltype
    });

    const token = captain.generateJwtToken();
    res.status(201).json({ captain, token });
};

module.exports.loginCaptain = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const captain = await captainmodel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({errors:[{msg : "Invalid email or password"}]})
    }

    const checkpassword  = await captain.comparePassword(password);

    if(!checkpassword){
        return res.status(401).json({errors : [{msg:"Invalid email or password"}]});
    }

    const token = captain.generateJwtToken();

    res.cookie("token",token);
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async(req,res) =>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptainProfile = async(req,res) =>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logout successfully'});
}