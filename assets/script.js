var timeEl = document.getElementById("time");
var dateEl = document.getElementById("date");
var currentWeatherItemsEl = document.getElementById("current-weather-items");
var timezone = document.getElementById("time-zone");
var weatherForecastEl = document.getElementById("weather-forecast");
var currentTempEl = document.getElementById("current-temp");
var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// API Key
var api = '0bdde19c2474f30d8bf2a1bf8b56f8b2';

// Update date & time
setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var min = time.getMinutes();
    var ampm = '';

    // Change 24 hour to 12 hour format
    if (hour >= 13) {
        hour12 = hour %12;
    }

    // Change AM/PM based on hour number
    if (hour > 12) {
        ampm = 'pm';
    } else {
        ampm = 'am';
    }

    // Set time/date to elements
    timeEl.innerHTML = hour12 + ':' + min + ' ' + ampm;
    dateEl.innerHTML = daysOfTheWeek[day] + ', ' + date + ' ' + monthsOfTheYear[month];

}, 1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition(function(success) {
        var {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api}`)
        .then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
    })
}

getWeatherData();

function showWeatherData(data) {
    var {humidity, pressure, wind_speed} = data.current;
    
}