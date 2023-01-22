var city = document.querySelector('.city-name');
var temp = document.querySelector('.temperature');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.wind-speed');
var cityInput = document.querySelector('.city-input'); //getElementbyClassName returns an array

var apiKey = "47a5adb4b320deb886afffad5e515b45";

// Create a function that will pull in the API

// page loads, type in city name, click search, grab a city value, use that value to perform the API call, pull the current & forecasted weather from the API, and store search history

const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () {
    var cityValue = cityInput.value;
    cityData(cityValue);
    // console.log(cityValue);
    // console.log("potatos");
    // grab data from input field
    // call city data function
});

function cityData(cityInfo) {

    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=" + apiKey //How to connect a variable to a string 
    console.log(geoApi);
    fetch(geoApi)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            currentWeather(data[0].lat, data[0].lon)
        }); // Where lat and long exists
    // https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=47a5adb4b320deb886afffad5e515b45
}

function currentWeather(lat, lon) {
    var geoApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    fetch(geoApi)
        .then((response) => response.json())
        .then((data) => console.log(data));
}

// Need to get info from list item for each info (city name, wind, etc. )
// to display on the page, use .text content on each element from lin 1-5 for current weather

// Then for forecast, 0 first day 7 is second day 15 next day 23, 31, 39 (every 3 hours displays a time, so you need to move across the index of that array)
// each index