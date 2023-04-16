var request = require('request');
var weatherunits = require('./weatherunits');

var forecast = (latitude, longitude, callback) => {

    var apiKey = "HQFFD8W7GH38EMEBXEA8NNW67";
    request(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/today?unitGroup=us&key=${apiKey}`, (error, response) => {

        console.log('latitude: ', latitude);
        console.log('longitude: ', longitude);

        var responseData = JSON.parse(response.body);
        if (error) {
            callback(error);
        } else if (responseData.error) {
            callback(responseData.error);
        } else {
            const { celcius, precipitation, windSpeed } = weatherunits(responseData.currentConditions.temp, responseData.currentConditions.precipprob, responseData.currentConditions.windspeed);

            var fullResponseData = {
                celcius,
                humidity: responseData.currentConditions.humidity,
                precipitation,
                summary: responseData.currentConditions.conditions,
                sunRise: responseData.currentConditions.sunrise,
                pressure: responseData.currentConditions.pressure,
                windSpeed
            }
            callback(undefined, fullResponseData);
        }
    })
}

module.exports = forecast;