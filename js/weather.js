//my apiKey
const apiKey = import.meta.env.VITE_API_KEY;

const weatherDiv = document.querySelector(".weather-div");

//function call to get user location
getUserLocation();

//--------------------------------------------------------------
// Function to get user location, will be imported in date.js
//--------------------------------------------------------------
export function getUserLocation() {
  //if statement to check if user browser supports geolocation
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    //remove update forecast button if geolocation is not supported
    weatherBtn.remove();
  } else {
    //if supported run function to get user position
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // use browser geolocation api to get users location
  function success(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    console.log(userLat, userLon);

    // call function to get forecast
    getForecast(userLat, userLon);
  }

  function error() {
    console.error("Unable to retrieve your location", error);
    alert(`Error (${error.code}): ${error.message}`);
  }
}

//--------------------------------------------------------------
// Function to fetch weather forecast for user location
//--------------------------------------------------------------
async function getForecast(lat, lon) {
  try {
    /* added one parameter for language, one for unit selection and 
        one to limit the API response to only cover needed days and times*/
    const userApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=sv&cnt=21&appid=${apiKey}`;

    const response = await fetch(userApiUrl);

    if (!response.ok) {
      throw new Error(`HTTP-error: Status  ${response.status}`);
    }

    const userForecast = await response.json();

    //function to filter out relevant info from user forecast
    filterForecast(userForecast);
  } catch (error) {
    console.error("An error occurred: ", error);
    alert("Kunde inte hämta väderprognos, Error: " + error.message);
  }
}

//--------------------------------------------------------------
// Function to filter forecast
//--------------------------------------------------------------
function filterForecast(data) {
  //today will display the first list item i.e. the weather forecast for the following 3 - 4.5 hours.
  const today = [data.list[0]];

  //the weather for tomorrow and day3 will show the forecast for the weather at noon
  //use Date() object and add 1 to get the date for tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  //set the time to noon
  tomorrow.setHours(12, 0, 0, 0);

  const day3 = new Date();
  day3.setDate(day3.getDate() + 2);
  day3.setHours(12, 0, 0, 0);

  //filter the fetched list to only contain the forecast for noon tomorrow and day3
  const nextTwoDaysForecast = data.list.filter((forecast) => {
    return (
      forecast.dt_txt === tomorrow.toLocaleString() ||
      forecast.dt_txt === day3.toLocaleString()
    );
  });

  //concat the arrays for today and the next two days in the forecast for three days
  const threeDayForecast = today.concat(nextTwoDaysForecast);
  console.log("Filtered forecast for 3 days:", threeDayForecast);

  //function to render forecast on dashboard
  renderForcast(threeDayForecast);
}

//--------------------------------------------------------------
// Function to render forecast
//--------------------------------------------------------------
// Use forEach to render weather for three days
function renderForcast(array) {
  array.forEach(function (element, index) {
    const weatherDisplay = document.getElementById(`weather${index}`);

    //function renderForecastDay to get the right weatherHeading
    const weatherHeading = renderForecastDay(index);

    //display weather on dashboard
    weatherDisplay.innerHTML = `<img class="weather-icon" src="https://openweathermap.org/img/wn/${
      element.weather[0].icon
    }@2x.png">
            <div class="weather-text">
                <h3>${weatherHeading}</h3>
                <div class="weather-para">
                    <p class="weather-temp">${Math.round(
                      element.main.temp
                    )}&deg</p>
                    <p class="weather-description">${
                      element.weather[0].description
                    }</p>
                <div>
            </div>`;
  });
}

//--------------------------------------------------------------
// Function to render forecast day (i.e. forecast h3)
//--------------------------------------------------------------
function renderForecastDay(index) {
  if (index === 0) {
    return "Idag";
  } else if (index === 1) {
    return "Imorgon";
  } else {
    const day3 = new Date();
    day3.setDate(day3.getDate() + 2);

    /* getDay() returns a number 0-6, 0 = Sunday, 1 = Monday... 
        Weekdays array is used to convert number to corresponding weekday*/
    const weekdays = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];

    return weekdays[day3.getDay()];
  }
}

//--------------------------------------------------------------
// Function to update forecast on button click
//--------------------------------------------------------------
const weatherBtn = document.getElementById("weather-button");

weatherBtn.addEventListener("click", function () {
  //adding text so user can see that weather is updated
  const updateText = document.createElement("p");
  updateText.innerHTML = `<p>Vädret uppdateras...</p>`;
  weatherDiv.appendChild(updateText);
  setTimeout(() => {
    updateText.remove();
    getUserLocation();
  }, 1000);
});

//--------------------------------------------------------------
// Function to show info modal
//--------------------------------------------------------------
const infoIcon = document.querySelector(".fa-circle-info");
const infoModal = document.getElementById("forecast-info");
infoIcon.addEventListener("click", () =>
  infoModal.classList.remove("modal-hidden")
);

//--------------------------------------------------------------
// Function to hide info modal
//--------------------------------------------------------------
const closeModal = document.querySelector(".close");
closeModal.addEventListener("click", () =>
  infoModal.classList.add("modal-hidden")
);
