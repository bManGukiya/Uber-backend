const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { location } = req.query;

    try {
        const coordinates = await mapsService.getLatLongFromUrl(location);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module,exports.getDistanceandTime = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {origin,destination} = req.query;
        const distance = await mapsService.getDistancetime(origin,destination);
        res.status(200).json(distance);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports.getsuggestion = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {input} = req.query;
        const suggestion = await mapsService.getsuggestionservice(input);
        res.status(200).json(suggestion);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}