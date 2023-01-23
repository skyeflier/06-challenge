// ok this first part is just how to set local storage so that you have a list of citys

// right now your code just replaces the old city in local storage with the new one

// instead of add to local strorage

// Make this array global by putting it at the very top of your code. Make sure it is NOT in a function.
var cityNameHistoryArray = [];
// cityName is a key. It can be whatever you want it just has to stay consistant.
cityNameHistoryArray = localStorage.getItem('cityName');

// if there is anything in local storage
if (cityNameHistoryArray) {
    // json parse cityNameHistoryArray
    // then .push new city name into array
} else {
    // this is if there is nothing in local storage. we cant push to the array if it does not exist. So we redefine it with the new city name inside.
    cityNameHistoryArray = [cityName];
}

// json stringify cityNameHistoryArray

localStorage.setItem('cityName', cityNameHistoryArray);



// -----------------------------------------------------------