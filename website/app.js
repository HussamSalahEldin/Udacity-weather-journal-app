/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = '&appid=c42bb84b10bfb0aa93e03d4c6db3ef72&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const user_input = document.getElementById('feelings').value;

    if (zipCode == '')
        return;

    const fullurl = `${baseURL}?q=${zipCode}${apiKey}`;

    getData(fullurl)
        .then(function (data) {
            postWeatherData('/add', { temp: data.main.temp, date: newDate, feelings: user_input })
        })
        .then(function () {
            updateUI()
        });
}

// Async GET to call APIs using URL parameter
// Make this generic to use in both (getting weather, and fetch all data in our app)
const getData = async (url) => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


// Async POST to add data in our array
const postWeatherData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) { 
        console.log("error", error);
    }
}

//Update UI function
updateUI = async () => {
    allData = await getData('/all');
    document.getElementById('date').innerHTML = `My date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `My temp: ${allData.temp}`;
    document.getElementById('content').innerHTML = `My feelings: ${allData.feelings}`;
}
