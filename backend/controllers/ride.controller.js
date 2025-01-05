const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRidecontroller = async (req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {userId,pickup,destination,vehicaltype} = req.body;

    try{
    const ridesevice = await rideService.createRide({
                user:req.user._id,
                pickup,
                destination,
                vehicaltype
            });
    return  res.status(201).json(ridesevice);
    }
    catch(err){
       return res.status(400).json({errors:err.message});
    }
}

module.exports.getRidecontroller = async(req,res)=>{
    try{
        const ride = await rideService.getfare(req.query.pickup,req.query.destination);
        res.status(200).json(ride);
    }
    catch(err){
        res.status(400).json({errors:err.message});
    }
}
