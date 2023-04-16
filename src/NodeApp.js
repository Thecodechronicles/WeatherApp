const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const hbsPartialsPath = path.join(__dirname, '../template/partials');
const port = process.env.PORT || 3000;

hbs.registerPartials(hbsPartialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));

app.use(cors());
app.get('', (req, res) => {
    res.render('index', {
        headNote: 'Weather Forecast !',
        content: 'For city wise weather report, visit this site',
        footNote: 'Ankit Mittal'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        headNote: 'Help Topics',
        content: 'Find the topics you need help with',
        footNote: 'Ankit Mittal'
    });
})

app.get('/weather', (req, res) => {
    var address = req.query.address;
    var key = req.query.key;
    if (key === 'undefined') key = undefined;

    geocode(key, address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        } else {
            forecast(latitude, longitude, (error, { celcius, humidity, precipitation, summary, sunRise, pressure, windSpeed } = {}) => {
                if (error) {
                    return res.send({ error });
                } else {
                    var forecastString = 'Your weather forecast for the day.. ' + '<br><br>' + 'Current Conditions: ' + summary + '<br>' + 'Sunrise: ' + sunRise + '<br>' + 'Temperature: ' + celcius + ' °C' + '<br>' + 'Humidity: ' + humidity + ' % ' + '<br>' + 'Pressure: ' + pressure + ' hPa' + '<br>' + 'Windspeed: ' + windSpeed + ' kph' + '<br>' + 'Precipitation: ' + precipitation + ' %';
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send({
                        weatherForecast: forecastString,
                        address,
                        location,
                    });
                }
            });
        }
    })
})

app.get('/products', (req, res) => {
    res.render('products', {
        headNote: 'Products',
        content: 'This app provides weather forecast for visitors',
        footNote: 'Ankit Mittal'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        headNote: 'About Us',
        content: 'This page will give you information about us',
        footNote: 'Ankit Mittal'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        headNote: 404,
        content: 'The page you are looking for has not been invented !!!!! Now go invent it, You little computer sceintist !!!!!',
        footNote: 'Ankit Mittal'
    });
})

app.listen(port, () => {
    console.log('Listening on port: ', port);
})