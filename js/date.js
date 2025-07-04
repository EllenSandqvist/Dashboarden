//import function from weather.js to be able to update weather on new day
import { getUserLocation } from "./weather.js";

//variable to check if it's a new day and weather forecast needs an update
let initialDate = null;

//eventlistener with a function that starts when window is loaded
window.addEventListener("load", showCurrentTime);

//----------------------------------------------------
// Function to show current date and time
//----------------------------------------------------
function showCurrentTime() {
  const dateDisplay = document.querySelector(".date");
  //get current date and time from the Date object
  const currentDate = new Date();

  //functions to get time, date, month and year in right formats
  const time = getTime(currentDate);
  const dateOfMonth = getDateOfMonth(currentDate);
  const monthAndYear = getMonthAndYear(currentDate);

  //render date on dashboard
  dateDisplay.innerHTML = `<p>
            <strong class="date-span">${time}</strong> 
            ${dateOfMonth} ${monthAndYear}
        </p>`;

  /* setTimeout will update time and date every 20th second 
    and check if it is a new date and weather needs to be updated */
  setTimeout(() => {
    showCurrentTime();

    /* if statement to check if it's a new day 
        - if so call getUserLocation() to update weather */
    if (initialDate !== dateOfMonth) {
      console.log(
        "It's no longer day " + initialDate + " of the month. Update forecast!"
      );
      getUserLocation();
      initialDate = dateOfMonth;
    }
  }, 20_000);
}

//----------------------------------------------------
// Function to get current time in right format
//----------------------------------------------------
function getTime(date) {
  //get current time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  //add a "0" before number if hour or min is less than 10
  return (
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes
  );
}

//-------------------------------------------------------------------
// Function to get current date in right format
//-------------------------------------------------------------------
function getDateOfMonth(date) {
  //get date of the month
  return date.getDate();
}

//-------------------------------------------------------------------
// Function to get current month & year in right format
//-------------------------------------------------------------------
function getMonthAndYear(date) {
  //array of months needed to convert the "month-number" from the Date object
  const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  /* date.getMonth returns a number 0-11, months[...] are used 
    to convert this to the actual month */
  let month = months[date.getMonth()];

  //get current year
  let year = date.getFullYear();

  return month + " " + year;
}
