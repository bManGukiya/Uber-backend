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