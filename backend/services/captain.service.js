const captainmodel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname,lastname,email,password,
    color,plate,capacity,vehicaltype,
    }) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicaltype) {
        throw new Error("All fields are required");
    }
    const captain = await captainmodel.create({
        fullname: {
        firstname,
        lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicaltype,
    }});
    return captain;
};