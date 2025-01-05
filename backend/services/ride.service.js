const ridemodel = require('../models/ride.model');
const mapservice = require('../services/maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getfare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required"); 
    }
    const distancetime = await mapservice.getDistancetime(pickup, destination);

    const baseFare = {
        auto: 20,
        motorcycle: 15,
        car: 30
    };

    const perKmRate = {
        auto: 10,
        motorcycle: 8,
        car: 12
    };

    const perMinuteRate = {
        auto: 2,
        motorcycle: 1.5,
        car: 3
    };
    const fare = {
        auto: (baseFare.auto + (distancetime.distance.value/1000 * perKmRate.auto) + (distancetime.time.value/60 * perMinuteRate.auto)).toFixed(2),
        motorcycle: (baseFare.motorcycle + (distancetime.distance.value/1000 * perKmRate.motorcycle) + (distancetime.time.value/60 * perMinuteRate.motorcycle)).toFixed(2),
        car: (baseFare.car + (distancetime.distance.value/1000 * perKmRate.car) + (distancetime.time.value/60 * perMinuteRate.car)).toFixed(2),
    };
    return fare;
}

module.exports.getfare = getfare;

function generateOTP(num) {
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide = async ({user, pickup, destination, vehicaltype}) => {
    if (!user || !pickup || !destination || !vehicaltype) {
        throw new Error("All fields are required");
    }
    const fare = await getfare(pickup, destination);
    const ride = await ridemodel.create({
        user,
        pickup, 
        destination,
        otp: generateOTP(6),
        fare: fare[vehicaltype],
    });
    return ride; 
}


