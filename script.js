//City input from website user
var cityName = document.querySelector('.city-name');
var cityInput = document.querySelector('.city-input');
var historyContainerElement = document.querySelector('#search-history-container');
var cityNameHistoryArray = JSON.parse(localStorage.getItem("cities")) || [] // Setting a default - Check to see if there is something in local storage, if there is nothing in local storage, then set this variable to an empty array
var apiKey = "47a5adb4b320deb886afffad5e515b45";

// Current date - WHEN UPDATING ADD TIME
var today = dayjs().format('DD MMMM YYYY');
$('#date-current').text(today);

//Current Weather Variables
var dateCurrent = document.querySelector('.date-current');
var currentWeatherIcon = document.querySelector('.current-weather-icon');
var iconCurrentEL = document.createElement('iconCurrent');
var tempCurrent = document.querySelector('#temperature-current');
var humidityCurrent = document.querySelector('#humidity-current');
var windCurrent = document.querySelector('#wind-current');

const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () { // When the user types in a city and clicks 'search', cityData function is called to call the weather data they are requesting. 
    var cityValue = cityInput.value; // The value property sets or returns the value of the value attribute of a text field. In this case, the user input of a city name. 
    cityData(cityValue); // Calling the city Data function WHY CAN WE NOT USE CITYINPUT? WHY DO WE NEED TO CREATE A NEW VALUE
    saveSearch(cityValue);
    onLoad(cityValue);
});

function cityData(cityInfo) {
    // console.log(cityInfo)
    var geoApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=" + apiKey //This is how to connect a variable to a string 
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
            console.log(data)
            var info = data.list[0];
            // console.log(info)
            displayData(info);
            forecastWeather(data); //This argument (data) takes the place of the parameter 
        })
}

function forecastWeather(data) { //This variable here is called a parameter
    console.log(data) //This is checking to see what information is being pulled from 'data'
    var forecastInfo = data.list; //5,13,21,29,37, these numbers are based on the arrays, which we can see with the console.log

    for (let day = 5; day < forecastInfo.length; day += 8) {
        console.log(forecastInfo[day]) //Grabbing forecastInfo (which is the array) and selecting the days, which should be every 24 hours at noon

        var dateEl = document.getElementById(`date-day-${day}`);
        dateEl.innerHTML = forecastInfo[day].dt_txt;

        var iconEl = document.getElementById(`icon-day-${day}`);
        iconEl.src = `https://openweathermap.org/img/w/${forecastInfo[day].weather[0].icon}.png`

        var tempEl = document.getElementById(`temperature-day-${day}`);
        tempEl.innerHTML = forecastInfo[day].main.temp + "°F";

        var humidityForecast = document.getElementById(`humidity-day-${day}`);
        humidityForecast.innerHTML = forecastInfo[day].main.humidity + "% humidity"

        var windForecast = document.getElementById(`wind-day-${day}`);
        windForecast.innerHTML = forecastInfo[day].wind.speed + " " + "mph"
    }
}

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
    windCurrent.innerHTML = weatherInfo.wind.speed + " " + "mph"
}

function onLoad() {
    historyContainerElement.innerHTML = ""
    if (cityNameHistoryArray !== 0) { // This is saying, if it's not an empty array in storage then loop through what we have and display
        for (let i = 0; i < cityNameHistoryArray.length; i++) {
            let liEl = document.createElement("li")
            let historyButton = document.createElement("button")
            historyButton.setAttribute('type', 'button'); // Type defines what type of content to display in the browser
            historyButton.setAttribute('id', 'history-button');
            historyButton.setAttribute('data-value', cityNameHistoryArray[i]);
            historyButton.addEventListener('click', function (e) {
                if (e.target.dataset.value === cityNameHistoryArray[i]) {
                    cityData(cityNameHistoryArray[i]);
                    cityInput.value = cityNameHistoryArray[i];
                }
            });
            historyButton.textContent = cityNameHistoryArray[i] //This is adding the text content, or history city names to this button
            liEl.appendChild(historyButton)
            historyContainerElement.appendChild(liEl)
        }
    }
}

function saveSearch(cityValue) {
    var city = cityInput.value
    cityNameHistoryArray.push(city);
    localStorage.setItem("cities", JSON.stringify(cityNameHistoryArray));
}

onLoad()