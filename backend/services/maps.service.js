const axios = require('axios');

module.exports.getLatLongFromUrl = async (input) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = input.match(regex);
    if (match) {
        return {
            latitude: parseFloat(match[1]),
            longitude: parseFloat(match[2])
        };
    } else {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: input,
                    format: 'json',
                    limit: 1
                }
            });

            if (response.data && response.data.length > 0) {
                return {
                    latitude: parseFloat(response.data[0].lat),
                    longitude: parseFloat(response.data[0].lon)
                };
            } else {
                throw new Error('Location not found');
            }
        } catch (error) {
            console.log(err);
            throw new Error('Error fetching coordinates');
        }
    }
};

const haversineDistance = (coords1, coords2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371;
    const dLat = toRadians(coords2.latitude - coords1.latitude);
    const dLon = toRadians(coords2.longitude - coords1.longitude);

    const lat1 = toRadians(coords1.latitude);
    const lat2 = toRadians(coords2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const calculateTime = (distance, speed = 60) => {
   if (typeof distance !== 'number' || typeof speed !== 'number') {
       throw new Error('Invalid arguments for calculateTime');
   }
   const timeInHours = distance / speed;
   const hours = Math.floor(timeInHours);
   const minutes = Math.round((timeInHours - hours) * 60);
   const totalMinutes = hours * 60 + minutes;
   return {
    time: `${hours} hours ${minutes} minutes`,
    value: totalMinutes
   }
};

module.exports.getDistancetime = async (origin, destination) => {
    try {
        const originCoords = await module.exports.getLatLongFromUrl(origin);
        const destinationCoords = await module.exports.getLatLongFromUrl(destination);

        const distance = haversineDistance(originCoords, destinationCoords);
        const fixedDistance = distance.toFixed(2);
        const value = distance.toFixed(2)*1000;
        const time = calculateTime(parseFloat(distance.toFixed(2)),60)
        return {
            distance:{fixedDistance,value},
            time : time,
            status: 'OK'
        };
    } catch (error) {
        console.error('Error calculating distance:', error.message);
        throw new Error('Error calculating distance');
    }
};

module.exports.getsuggestionservice = async (input) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: input,
                format: 'json',
                limit: 5
            }
        });

        return response.data.map((result) => ({
            display_name: result.display_name,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon)
        }));
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        throw new Error('Error fetching suggestions');
    }
};