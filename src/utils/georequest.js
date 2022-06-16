var request = require('request');

var georequest = (callback, address, apiobj) => {
    request('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiobj.apikey + '&q=' + address + '&language=en-us&details=false', (error, response) => {
        var responseData = JSON.parse(response.body);
        // console.log(responseData);
        if (error) {
            callback(error);
            console.log(error);
        } else if (responseData.body === '[]') {
            callback('No place found with the name ' + "'" + address + "'" + ' ' + response.body);
        } else if (responseData.Code) {
            // var responseData = JSON.parse(response.body);
            var errobj = {
                code: responseData.Code,
                message: responseData.Message
            }
            callback(errobj);
        } else {
            // var responseData = JSON.parse(response.body);
            // console.log(responseData);
            callback(undefined, {
                latitude: responseData[0].GeoPosition.Latitude,
                longitude: responseData[0].GeoPosition.Longitude,
                location: responseData[0].LocalizedName + ',' + responseData[0].AdministrativeArea.LocalizedName + ',' + responseData[0].AdministrativeArea.CountryID
            })
        }

    })
}

module.exports = georequest;