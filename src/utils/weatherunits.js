var weatherunits = (temperature, humidity, precipProbability, windVelocity) => {
    return {
        celcius: (((temperature - 32) / 1.8).toFixed(2)) * 1,
        humidity: ((humidity * 100).toFixed(2)) * 1,
        precipitation: ((precipProbability * 100).toFixed(2)) * 1,
        windSpeed: ((windVelocity * 1.852).toFixed(2)) * 1
    }
}

module.exports = weatherunits;