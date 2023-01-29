var cityName = document.querySelector('.city-name');

//Current Weather Variables
var dateCurrent = document.querySelector('.date-current');
var currentWeatherIcon = document.querySelector('.current-weather-icon');
var iconCurrentEL = document.createElement('iconCurrent');
var tempCurrent = document.querySelector('#temperature-current');
var humidityCurrent = document.querySelector('#humidity-current');
var windCurrent = document.querySelector('#wind-current');

//Five Day Forecast Variables
var forecastWeatherIcon = document.querySelector('.weather-icon-forecast');
var iconForecastEL = document.createElement('iconForecast');
var tempForecast = document.querySelector('.temperature-forecast');
var humidityForecast = document.querySelector('.humidity-forecast');
var windForecast = document.querySelector('.wind-forecast');

var dateDayOne = document.querySelector('#date-day-one');
var dateDayTwo = document.querySelector('#date-day-two');
var dateDayThree = document.querySelector('#date-day-three');
var dateDayFour = document.querySelector('#date-day-four');
var dateDayFive = document.querySelector('#date-day-five');

var iconDayOne = document.querySelector('#icon-day-one');
var iconDayTwo = document.querySelector('#icon-day-two');
var iconDayThree = document.querySelector('#icon-day-three');
var iconDayFour = document.querySelector('#icon-day-four');
var iconDayFive = document.querySelector('#icon-day-five');

var temperatureDayOne = document.querySelector('#temperature-day-one');
var temperatureDayOne = document.querySelector('#temperature-day-two');
var temperatureDayOne = document.querySelector('#temperature-day-three');
var temperatureDayOne = document.querySelector('#temperature-day-four');
var temperatureDayOne = document.querySelector('#temperature-day-five');

var humidityDayOne = document.querySelector('#humidity-day-one');
var humidityDayTwo = document.querySelector('#humidity-day-two');
var humidityDayThree = document.querySelector('#humidity-day-three');
var humidityDayFour = document.querySelector('#humidity-day-four');
var humidityDayFive = document.querySelector('#humidity-day-five');

var windDayOne = document.querySelector('#wind-day-one');
var windDayTwo = document.querySelector('#wind-day-two');
var windDayThree = document.querySelector('#wind-day-three');
var windDayFour = document.querySelector('#wind-day-four');
var windDayFive = document.querySelector('#wind-day-five');




var cityInput = document.querySelector('.city-input');
var historyContainerElement = document.querySelector('#search-history-container');

var cityNameHistoryArray = JSON.parse(localStorage.getItem("cities")) || [] // Setting a default - Check to see if there is something in local storage, if there is nothing in local storage, then set this variable to an empty array

var apiKey = "47a5adb4b320deb886afffad5e515b45";

const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () { // When the user types in a city and clicks 'search', cityData function is called to call the weather data they are requesting. 
    var cityValue = cityInput.value; // The value property sets or returns the value of the value attribute of a text field. In this case, the user input of a city name. 
    cityData(cityValue); // Calling the city Data function WHY CAN WE NOT USE CITYINPUT? WHY DO WE NEED TO CREATE A NEW VALUE
    saveSearch(cityValue);
    onLoad(cityValue);
});

function cityData(cityInfo) { // cityData is a function that is calling the openweather API and pulling in City information. 
    console.log(cityInfo)
    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=" + apiKey //This is how to connect a variable to a string 
    fetch(geoApi)
        .then((response) => response.json()) // This translates the original data to readable data in JSON format
        .then((data) => { // This now allows you to work with the data from openWeather
            console.log(data)
            currentWeather(data[0].lat, data[0].lon); // This is where lat and long exists
        });
}

function currentWeather(lat, lon) {
    var geoApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    fetch(geoApi)
        .then((response) => response.json())
        .then((data) => {
            // var info = data.list[29];
            var info = data.list[0];
            displayData(info);
        })
}

function displayData(weatherInfo) {
    var city = cityInput.value
    let cityNameEl = document.querySelector("#city-name");
    let imageEl = document.querySelector('#icon-current');
    imageEl.src = `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`
    currentWeatherIcon.appendChild(imageEl)
    cityNameEl.innerHTML = city.toUpperCase();
    tempCurrent.innerHTML = weatherInfo.main.temp + "°F"
    console.log(weatherInfo);
    humidityCurrent.innerHTML = weatherInfo.main.humidity + "%"
    windCurrent.innerHTML = weatherInfo.wind.speed + " " + "mph"
}

function onLoad() {
    historyContainerElement.innerHTML = ""
    if (cityNameHistoryArray !== 0) { // if it's not an empty array in storage then loop through what we have and display
        for (let i = 0; i < cityNameHistoryArray.length; i++) {
            let liEl = document.createElement("li")
            let historyButton = document.createElement("button")
            historyButton.setAttribute('type', 'button'); // Type defines what type of content to display in the browser
            historyButton.setAttribute('id', 'history-button'); // id styles the id
            historyButton.setAttribute('data-value', cityNameHistoryArray[i]);
            historyButton.addEventListener('click', function (e) {
                if (e.target.dataset.value === cityNameHistoryArray[i]) {
                    cityData(cityNameHistoryArray[i]);
                    cityInput.value = cityNameHistoryArray[i];
                }
            });
            historyButton.textContent = cityNameHistoryArray[i] //The text content of this button
            liEl.appendChild(historyButton)
            historyContainerElement.appendChild(liEl)
        }
    }
}

function saveSearch(cityValue) { //when we load, we'll grab everything in storage 
    var city = cityInput.value
    cityNameHistoryArray.push(city);
    localStorage.setItem("cities", JSON.stringify(cityNameHistoryArray));
}



onLoad()