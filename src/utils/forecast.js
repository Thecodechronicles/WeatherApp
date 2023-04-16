var request = require('request');
var weatherunits = require('./weatherunits');

var forecast = (latitude, longitude, callback) => {
    // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/28.53,77.39/today?unitGroup=us&key=HQFFD8W7GH38EMEBXEA8NNW67  // visualcrossing API
    //apikey provides 1000 calls/day
    // var apiKey = 'dc9cf54ef9917c436ae2fcc1330c6a30';
    var apiKey = "HQFFD8W7GH38EMEBXEA8NNW67"; // for visualCrossing api
    // request('https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude, (error, response) => {
    request(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/today?unitGroup=us&key=${apiKey}`, (error, response) => {
        console.log('latitude: ', latitude);
        console.log('longitude: ', longitude);


        // console.log('api response: ', response.body);
        var responseData = JSON.parse(response.body);
        if (error) {
            callback(error);
        } else if (responseData.error) {
            callback(responseData.error);
        } else {
            // const { celcius, humidity, precipitation, windSpeed } = weatherunits(responseData.currently.temperature, responseData.currently.humidity, responseData.currently.precipProbability, responseData.currently.windSpeed);

            const { celcius, precipitation, windSpeed } = weatherunits(responseData.currentConditions.temp, responseData.currentConditions.precipprob, responseData.currentConditions.windspeed);

            var fullResponseData = {
                celcius,
                humidity: responseData.currentConditions.humidity,
                precipitation,
                summary: responseData.currentConditions.conditions,
                // hourlySummary: responseData.hourly.summary,
                sunRise: responseData.currentConditions.sunrise,
                pressure: responseData.currentConditions.pressure,
                windSpeed
            }

            callback(undefined, fullResponseData);
        }
    })
}

module.exports = forecast;