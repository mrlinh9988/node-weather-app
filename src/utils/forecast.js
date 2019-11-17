const request = require('request');
const geocode = require('./geocode');

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/fa844e09b41ec8bf81110b3c984e3c2c/' + lat + ',' + long + '?units=si';
    // shorthand syntax es6: url
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It currently ' + body.currently.temperature + ' degree out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of is ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = forecast