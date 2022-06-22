var georequest = require('./georequest');
var fs = require('fs');
var apiObj = {};
var dummyKey = 'I9mgo9G1mD9yQirN9uIK4RA5UsAmHE6I';
var geocode = (key, address, callback) => {
    if (key) {
        apiObj = { apikey: key }
        var apiJsonString = JSON.stringify(apiObj);
        fs.writeFile('./src/utils/apikey.json', apiJsonString, (err) => {
            if (err) {
                console.log('Error writing to file: ', err);
                apiObj.apikey = dummyKey;
            } else {
                console.log('apiKey written: ', apiObj);
            }
            console.log('current apikey: ', apiObj);
            georequest(callback, address, apiObj);
        });
        return;
    } else if (!apiObj.apikey) {
        fs.readFile('./src/utils/apikey.json', (err, data) => {
            if (err) {
                console.log('Error reading from file: ', err);
                apiObj.apikey = dummyKey;
            } else if (data) {
                var keyapi = JSON.parse(data);
                apiObj.apikey = keyapi.apikey;
                console.log('apikey retrieved: ', keyapi);
            }
            console.log('current apikey: ', apiObj);
            georequest(callback, address, apiObj);
        });
        return;
    }
    console.log('apikey for current session: ', apiObj);
    georequest(callback, address, apiObj);
}

module.exports = geocode;