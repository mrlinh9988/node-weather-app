const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibXJsaW5oOTgiLCJhIjoiY2syanUxcWE1MG9jZjNudHJocmI3OTg1YiJ9.2AMwhkfXqvOf-4FX4zRkIQ';

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location services');
        } else if (body.features.length === 0) {
            callback('Unable find location. Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}




module.exports = geocode