var formElement = document.querySelector('form');
var searchElement = document.querySelector('input');
var submitElement = document.querySelector('button');

submitElement.addEventListener('click', (e) => {
    e.preventDefault();
    var key = undefined;
    var location = searchElement.value;
    var keyElement = document.getElementById('keybox');
    if (keyElement) {
        key = keyElement.value;
    }
    if (location) {
        var weatherElement = document.getElementById('weatherReport');
        weatherElement.innerHTML = 'Loading your weather report....'
        fetch('/weather?address=' + location + '&key=' + key).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    weatherElement.innerHTML = data.error;
                    if (data.error.code === 'ServiceUnavailable' || data.error.code === 'Unauthorized') {
                        weatherElement.innerHTML = '<input id="keybox" type="text" placeholder="Enter another key please">' + '<br></br>' + 'Enter New Key ! ' + 'Reason: ' + data.error.code
                    }
                } else {
                    weatherElement.innerHTML = data.weatherForecast + '<br><br>' + 'Location: ' + data.location;
                }
            });
        });
    }
});