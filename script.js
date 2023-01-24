var cityName = document.querySelector('.city-name');
var temp = document.querySelector('.temperature');
var tempCurrent = document.querySelector('#temperature-current')
var humidity = document.querySelector('.humidity');
var humidityCurrent = document.querySelector('#humidity-current')
var wind = document.querySelector('.wind');
var windCurrent = document.querySelector('#wind-current');
var cityInput = document.querySelector('.city-input'); //getElementbyClassName returns an array

var cityNameHistoryArray = [];

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var apiKey = "47a5adb4b320deb886afffad5e515b45";

// User story: page loads, type in city name, click search, grab a city value, use that value to perform the API call, pull the current & forecasted weather from the API, and store search history

const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () { // When the user types in a city and clicks 'search', cityData function is called to call the weather data they are requesting. 
    var cityValue = cityInput.value; // The value property sets or returns the value of the value attribute of a text field. In this case, the user input of a city name. 
    cityData(cityValue); // Calling the city Data function WHY CAN WE NOT USE CITYINPUT? WHY DO WE NEED TO CREATE A NEW VALUE
});

function cityData(cityInfo) { // cityData is a function that is calling the openweather API and pulling in City information. 
    console.log(cityInfo)
    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=" + apiKey //This is how to connect a variable to a string 
    // console.log(geoApi);
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
            var info = data.list[29];
            displayData(info);
        })
    // .then((data) => console.log(data.list));
}

function displayData(weatherInfo) {
    tempCurrent.innerHTML = weatherInfo.main.temp + "°F"
    humidityCurrent.innerHTML = weatherInfo.main.humidity + "%"
    windCurrent.innerHTML = weatherInfo.wind.speed + " " + "mph"
    localStorage.setItem("cityInput", weatherInfo);
    console.log(weatherInfo);
}

function searchHistory() {
    cityNameHistoryArray = localStorage.getItem('cityName');
    if (cityNameHistoryArray) {
        var storedCities = parseInt(this.dataset.cityNameHistoryArray) // json parse cityNameHistoryArray
        var savedCities = cityNameHistoryArray.push(this) // then .push new city name into array
    } else {
        cityNameHistoryArray = [cityName]; // this is if there is nothing in local storage. we cant push to the array if it does not exist. So we redefine it with the new city name inside.
    }
    // var cities = localStorage.getItem(cityNameHistoryArray);
    // cityNameHistoryArray.value

    // console.log(JSON.stringify(storedCities));
    // console.log(JSON.stringify(savedCities));
}

// I can say that you can push the users input or search into the array and save it in the array. Then a forloop can be used to loop through it and create the buttons and list that shows on the screen

JSON.stringify(cityNameHistoryArray) // json stringify cityNameHistoryArray

localStorage.setItem('cityName', cityNameHistoryArray);

if (cityNameHistoryArray) {
    // Json parse cityNameHistoryArray

    for (var i = 0; i < cityNameHistoryArray.length; i++) {
        // create button element
        // use .textcontent to add text from cityNameHistoryArray[i] to button
        // append button to already existing element in the html
    }
}


// function weatherForecast() {

// loop through images http://openweathermap.org/img/wn/
// }

// function searchHistory() {
//     var recentSearch = []
//     recentSearch.push
//     var cityInput = data.name
//     var cityName = localStorage.getItem("cityInput")
//     document.querySelector('cityInput').value = cityName;
// }

// TO DO - CREATE A FUNCTION FOR THE FORECAST DAYS
// TO DO - store data in the local


// Need to get info from list item for each info (city name, wind, etc. )
// to display on the page, use .text content on each element from lin 1-5 for current weather

// Then for forecast, 0 first day 7 is second day 15 next day 23, 31, 39 (every 3 hours displays a time, so you need to move across the index of that array)
// each index

// LOOK INTO FUNCTIONS, DEFINING & CALLING THEM