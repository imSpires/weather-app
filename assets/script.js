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
    // Get data for current day
    var {humidity, pressure, wind_speed} = data.current;
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>`;

    // Get data for each forecast day
    var otherDayForecast = "";
    data.daily.forEach((day, index) => {
        if (index === 0) {
            currentTempEl.innerHTML = '';
        `<div class="today" id="current-temp">
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <div class="temperature">Night - ${day.temp.night}&#176; C</div>
                <div class="temperature">Day - ${day.temp.day}&#176; C</div>
        </div>`

        } else {
            otherDayForecast +=
        `<div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temperature">Night - ${day.temp.night}&#176; C</div>
            <div class="temperature">Day - ${day.temp.day}&#176; C</div>
        </div>`
        }
    });

    // Add data to page
    weatherForecastEl.innerHTML = otherDayForecast;
};