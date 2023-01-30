//City input from website user
var cityName = document.querySelector('.city-name');
var cityInput = document.querySelector('.city-input');
var historyContainerElement = document.querySelector('#search-history-container');
var cityNameHistoryArray = JSON.parse(localStorage.getItem("cities")) || [] // Setting a default - Check to see if there is something in local storage, if there is nothing in local storage, then set this variable to an empty array
var apiKey = "47a5adb4b320deb886afffad5e515b45";

//Current Weather Variables
var dateCurrent = document.querySelector('.date-current');
var currentWeatherIcon = document.querySelector('.current-weather-icon');
var iconCurrentEL = document.createElement('iconCurrent');
var tempCurrent = document.querySelector('#temperature-current');
var humidityCurrent = document.querySelector('#humidity-current');
var windCurrent = document.querySelector('#wind-current');

//The HTML Cards for each day
var dayOneCard = document.querySelector('.day-one');
var dayTwoCard = document.querySelector('.day-two');
var dayThreeCard = document.querySelector('.day-three');
var dayFourCard = document.querySelector('.day-four');
var dayFiveCard = document.querySelector('.day-five');

//Five Day Forecast Variables
var forecastWeatherIcon = document.querySelector('.weather-icon-forecast');
var iconForecastEL = document.createElement('iconForecast');
var tempForecast = document.querySelector('.temperature-forecast');
var humidityForecast = document.querySelector('.humidity-forecast');
var windForecast = document.querySelector('.wind-forecast');

//Forecast Dates
var dateDayOne = document.querySelector('#date-day-one');
var dateDayTwo = document.querySelector('#date-day-two');
var dateDayThree = document.querySelector('#date-day-three');
var dateDayFour = document.querySelector('#date-day-four');
var dateDayFive = document.querySelector('#date-day-five');

var dateDayOne = document.querySelector('#date-day-one');
var iconDayOne = document.querySelector('#icon-day-one');
var temperatureDayOne = document.querySelector('#temperature-day-one');
var humidityDayOne = document.querySelector('#humidity-day-one');
var windDayOne = document.querySelector('#wind-day-one');

//Forecast Icons
var iconDayOne = document.querySelector('#icon-day-one');
var iconDayTwo = document.querySelector('#icon-day-two');
var iconDayThree = document.querySelector('#icon-day-three');
var iconDayFour = document.querySelector('#icon-day-four');
var iconDayFive = document.querySelector('#icon-day-five');

//Forecast Temperatures
var temperatureDayOne = document.querySelector('#temperature-day-one');
var temperatureDayOne = document.querySelector('#temperature-day-two');
var temperatureDayOne = document.querySelector('#temperature-day-three');
var temperatureDayOne = document.querySelector('#temperature-day-four');
var temperatureDayOne = document.querySelector('#temperature-day-five');

//Forecast Humidity
var humidityDayOne = document.querySelector('#humidity-day-one');
var humidityDayTwo = document.querySelector('#humidity-day-two');
var humidityDayThree = document.querySelector('#humidity-day-three');
var humidityDayFour = document.querySelector('#humidity-day-four');
var humidityDayFive = document.querySelector('#humidity-day-five');

//Forecast Wind
var windDayOne = document.querySelector('#wind-day-one');
var windDayTwo = document.querySelector('#wind-day-two');
var windDayThree = document.querySelector('#wind-day-three');
var windDayFour = document.querySelector('#wind-day-four');
var windDayFive = document.querySelector('#wind-day-five');

//Variable & Function to search for weather data when the user clicks the searchButton created in CSS
const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () { // When the user types in a city and clicks 'search', cityData function is called to call the weather data they are requesting. 
    var cityValue = cityInput.value; // The value property sets or returns the value of the value attribute of a text field. In this case, the user input of a city name. 
    cityData(cityValue); // Calling the city Data function WHY CAN WE NOT USE CITYINPUT? WHY DO WE NEED TO CREATE A NEW VALUE
    saveSearch(cityValue);
    onLoad(cityValue);
});

//cityData is a function that is calling the openweather API and pulling in City information. 
function cityData(cityInfo) {
    console.log(cityInfo)
    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=" + apiKey //This is how to connect a variable to a string 
    fetch(geoApi)
        .then((response) => response.json()) // This translates the original data to readable data in JSON format
        .then((data) => { // This now allows you to work with the data from openWeather
            console.log(data)
            currentWeather(data[0].lat, data[0].lon); // This is where lat and long exists
        });
}

//currentWeather is a function that is calling the openWeather API and pulling in current weather for the location searched
function currentWeather(lat, lon) {
    var geoApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    fetch(geoApi)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            var info = data.list[0];
            //displayData(data.list[0]) This is the same as displayData(info);
            // console.log(info)
            displayData(info);
            forecastWeather(data); //Argument takes the place of the parameter 
        })
}

function forecastWeather(data) { //This variable here is called a parameter
    console.log(data) //This is checking to see what information is being pulled from 'data'
    var forecastInfo = data.list; //5,13,21,29,37

    // var humidityEl = document.getElementById('humidity-day-${day}');
    // var windEl = document.getElementById('wind-day-${day}');
    for (let day = 5; day < forecastInfo.length; day += 8) {
        console.log(forecastInfo[day]) //Grabbing forecastInfo (which is the array) and selecting the days, which should be every 24 hours at noon

        // dayOneCard = forecastInfo[5]
        // dayTwoCard = forecastInfo[13]
        // dayThreeCard = forecastInfo[21]
        // dayFourCard = forecastInfo[29]
        // dayFiveCard = forecastInfo[37]

        // iconDayOne.src = `https://openweathermap.org/img/w/${forecastInfo.weather[day].icon}.png`
        // iconForecastEL.appendChild(iconDayOne)

        var tempEl = document.getElementById('temperature-day-$[day}');
        tempEl.textContent = forecastInfo[day].main.temp + "°F"
        // humidityForecast.innerHTML = forecastInfo[day].main.humidity + "% humidity"
        // windForecast.innerHTML = forecastInfo[day].wind.speed + " " + "mph wind"

    }
}

//This function called displayData pulls in the data from openWeather API and displays it to the web page. 
function displayData(weatherInfo) {
    var city = cityInput.value
    let cityNameEl = document.querySelector("#city-name");
    let imageEl = document.querySelector('#icon-current');
    imageEl.src = `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`
    currentWeatherIcon.appendChild(imageEl)
    cityNameEl.innerHTML = city.toUpperCase();
    tempCurrent.innerHTML = weatherInfo.main.temp + "°F"
    // console.log(weatherInfo);
    humidityCurrent.innerHTML = weatherInfo.main.humidity + "%"
    windCurrent.innerHTML = weatherInfo.wind.speed + " " + "mph wind"
}

//This function loops through cities the user has searched for and displays them on the page
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