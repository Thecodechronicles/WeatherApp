var formElement = document.querySelector('form');
var searchElement = document.querySelector('input');
var submitElement = document.querySelector('button');

submitElement.addEventListener('click', (e) => {
    e.preventDefault();
    var key = undefined;
    var location = searchElement.value;
    var keyElement = document.getElementById('keybox');
    console.log(keyElement);
    if (keyElement) {
        key = keyElement.value;
        console.log('New key entered: ', key);
    }
    if (location) {
        var weatherElement = document.getElementById('weatherReport');
        weatherElement.innerHTML = 'Loading your weather report....'
        fetch('http://192.168.1.2:3000/weather?address=' + location + '&key=' + key).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data.error);
                if (data.error) {
                    weatherElement.innerHTML = data.error;
                    if (data.error.code === 'ServiceUnavailable' || data.error.code === 'Unauthorized') {
                        console.log('jklm');
                        weatherElement.innerHTML = '<input id="keybox" type="text" placeholder="Enter another key">' + '<br></br>' + 'Enter New Key ! ' + 'Reason: ' + data.error.code
                    }
                } else {
                    weatherElement.innerHTML = data.weatherForecast + '<br><br>' + 'Location: ' + data.location;
                }
            });
        });
    }
    console.log(location);
});