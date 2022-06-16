var request = require('request');
var weatherunits = require('./weatherunits');

var forecast = (latitude, longitude, callback) => {
    var apiKey = 'dc9cf54ef9917c436ae2fcc1330c6a30';
    request('https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude, (error, response) => {
        var responseData = JSON.parse(response.body);
        if (error) {
            callback(error);
        } else if (responseData.error) {
            callback(responseData.error);
        } else {
            const { celcius, humidity, precipitation, windSpeed } = weatherunits(responseData.currently.temperature, responseData.currently.humidity, responseData.currently.precipProbability, responseData.currently.windSpeed);

            var fullResponseData = {
                celcius,
                humidity,
                precipitation,
                summary: responseData.currently.summary,
                hourlySummary: responseData.hourly.summary,
                pressure: responseData.currently.pressure,
                windSpeed
            }

            callback(undefined, fullResponseData);
        }

    })
}

module.exports = forecast;