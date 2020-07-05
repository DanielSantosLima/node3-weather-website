const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?language=en&access_token=pk.eyJ1IjoiZHNsaW1hIiwiYSI6ImNrYm04aXdoazA4eHgyeGxiZHU2cGI1aTQifQ.6YTR9aTD6WyW5HRWs4rq8w`

    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    });
};

module.exports = geocode;