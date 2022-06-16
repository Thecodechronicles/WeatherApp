// var request = require('request');
var georequest = require('./georequest');
var fs = require('fs');
var apiObj = {};
var dummyKey = 'I9mgo9G1mD9yQirN9uIK4RA5UsAmHE6I';
var geocode = (key, address, callback) => {
    if (key) {
        apiObj = { apikey: key }
        var apiJsonString = JSON.stringify(apiObj);
        console.log('new key: ', key);
        fs.writeFile('apikey.json', apiJsonString, (err) => {
            if (err) throw err;

            console.log(apiJsonString);
            console.log('apiKey saved: ', apiObj);
            georequest(callback, address, apiObj);
        });
        return;
    } else if (!apiObj.apikey) {
        console.log('qwerty');
        // apiObj.apikey = 'I9mgo9G1mD9yQirN9uIK4RA5UsAmHE6I';
        fs.readFile('apikey.json', (err, data) => {
            if (err) {
                console.log(err);
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
    // else if (apiObj.apikey) {
    console.log('yes key is not null');
    console.log('current apikey: ', apiObj);
    georequest(callback, address, apiObj);
    // }
}

module.exports = geocode;