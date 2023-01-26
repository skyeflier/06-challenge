var cityName = document.querySelector('.city-name');
var dateCurrent = document.querySelector('.date-current');

var iconCurrentEL = document.createElement('iconCurrent');
var tempCurrent = document.querySelector('#temperature-current');
var humidityCurrent = document.querySelector('#humidity-current');
var windCurrent = document.querySelector('#wind-current');

// var iconEL = document.createElementNS('icon');
var temp = document.querySelector('.temperature');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');

var cityInput = document.querySelector('.city-input'); //getElementbyClassName returns an array
var historyContainerElement = document.querySelector('#search-history-container');

var cityNameHistoryArray = JSON.parse(localStorage.getItem("cities")) || [] // Setting a default - Check to see if there is something in local storage, if there is nothing in local storage, then set this variable to an empty array

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var apiKey = "47a5adb4b320deb886afffad5e515b45";

// User story: page loads, type in city name, click search, grab a city value, use that value to perform the API call, pull the current & forecasted weather from the API, and store search history

const searchButton = document.querySelector('#search-button') // Needs to be in the global scope, because the button needs to be ready when the page is loaded
searchButton.addEventListener('click', function () { // When the user types in a city and clicks 'search', cityData function is called to call the weather data they are requesting. 
    var cityValue = cityInput.value; // The value property sets or returns the value of the value attribute of a text field. In this case, the user input of a city name. 
    cityData(cityValue); // Calling the city Data function WHY CAN WE NOT USE CITYINPUT? WHY DO WE NEED TO CREATE A NEW VALUE
    saveSearch();
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
    iconCurrentEL.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    fetch(geoApi)
        .then((response) => response.json())
        .then((data) => {
            // var info = data.list[29];
            var info = data.list[0];
            displayData(info);
        })
    // .then((data) => console.log(data.list));
}

http://openweathermap.org/img/wn/weather.icon.@2x.png

function displayData(weatherInfo) {
    var city = cityInput.value
    let cityNameEl = document.querySelector("#city-name");
    cityNameEl.innerHTML = city.toUpperCase();
    // <img src="http://openweathermap.org/img/wn/" ${
    //     weatherInfo.weather[0].icon
    // }
    // dateCurrent.innerHTML = weatherInfo.dt_txt
    // iconCurrent = weatherInfo.
    tempCurrent.innerHTML = weatherInfo.main.temp + "°F"
    console.log(weatherInfo);
    humidityCurrent.innerHTML = weatherInfo.main.humidity + "%"
    windCurrent.innerHTML = weatherInfo.wind.speed + " " + "mph"


    // cityNameHistoryArray.push(city)
    // localStorage.setItem("cities", JSON.stringify(cityNameHistoryArray));
    // console.log(weatherInfo);
}

function onLoad() {
    if (cityNameHistoryArray !== 0) { // if it's not an empty array in storage then loop through what we have and display
        for (let i = 0; i < cityNameHistoryArray.length; i++) {
            let liEl = document.createElement("li")
            let historyButton = document.createElement("button")
            historyButton.textContent = cityNameHistoryArray[i] //The text content of this button
            liEl.appendChild(historyButton)
            historyContainerElement.appendChild(liEl)
        }
    }
}

function saveSearch() { //when we load, we'll grab everything in storage 
    var city = cityInput.value
    cityNameHistoryArray.push(city)
    localStorage.setItem("cities", JSON.stringify(cityNameHistoryArray));
}

// when looping thorugh that array of cities, attach an event listener to each buttons and pass in a value (the text content of those buttons)
// call function city data and pass in that current search value 

// loop through images http://openweathermap.org/img/wn/


function searchHistory() {
}


// JSON.stringify(cityNameHistoryArray) // json stringify cityNameHistoryArray

// localStorage.setItem('cityName', cityNameHistoryArray);

// if (cityNameHistoryArray) {
//     // Json parse cityNameHistoryArray

//     for (var i = 0; i < cityNameHistoryArray.length; i++) {
//         // create button element
//         // use .textcontent to add text from cityNameHistoryArray[i] to button
//         // append button to already existing element in the html
//     }
// }

// function weatherForecast() {

onLoad()