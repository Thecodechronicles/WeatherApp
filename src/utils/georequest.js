var request = require('request');

var georequest = (callback, address, apiobj) => {
    //apikey provides 50 calls/day
    request('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiobj.apikey + '&q=' + address + '&language=en-us&details=false', (error, response) => {
        var responseData = JSON.parse(response.body);
        if (error) {
            callback(error);
        } else if (JSON.stringify(responseData) === '[]') {
            callback('No place found with the name ' + "'" + address + "'" + ' ' + response.body);
        } else if (responseData.Code) {
            var errobj = {
                code: responseData.Code,
                message: responseData.Message
            }
            callback(errobj);
        } else {
            callback(undefined, {
                latitude: responseData[0].GeoPosition.Latitude,
                longitude: responseData[0].GeoPosition.Longitude,
                location: responseData[0].LocalizedName + ',' + responseData[0].AdministrativeArea.LocalizedName + ',' + responseData[0].AdministrativeArea.CountryID
            })
        }

    })
}

module.exports = georequest;