//My accessKey
const accessKey = import.meta.env.VITE_UNSPLASH_KEY;

//Url for unsplash API with random images
const apiUrl = "https://api.unsplash.com/photos/random";

/* Get data from localStorage if there is any and store in backgroundObj, 
otherwise set backgroundObj to an empty Object. */
let backgroundObj = JSON.parse(localStorage.getItem("background")) || {};

//render background on page load
renderBackground();

//----------------------------------------------------
// Function to render background
//----------------------------------------------------
function renderBackground() {
  if (backgroundObj.url) {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${backgroundObj.url})`;
    attributePhotographer();
  }
}

//----------------------------------------------------
// Function to attribute Photographer
//----------------------------------------------------
function attributePhotographer() {
  const photoPara = document.querySelector(".photo-text");

  //remove class that hides photo-text
  photoPara.classList.remove("photo-text-hidden");

  //check if photographer has portfolio if so add a link otherwise just display name without link
  if (backgroundObj.portfolio) {
    photoPara.innerHTML = `Photo by <a href=${backgroundObj.portfolio} target="_blank">${backgroundObj.user}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
  } else {
    photoPara.innerHTML = `Photo by ${backgroundObj.user} on <a href="https://unsplash.com/">Unsplash</a>`;
  }
}

//----------------------------------------------------
// Function to generate new background on button click
//----------------------------------------------------
const backgroundButton = document.querySelector(".bg-button");

backgroundButton.addEventListener("click", () => {
  fetchData();
});

//----------------------------------------------------
// Function to fetch data from unsplash API
//----------------------------------------------------
async function fetchData() {
  try {
    //try to fetch from api with a orientation parameter
    const response = await fetch(
      `${apiUrl}?client_id=${accessKey}&orientation=landscape`
    );

    //check if response is ok
    if (!response.ok) {
      //if not, throw error
      throw new Error(`HTTP-error: Status ${response.status}`);
    }

    //convert response to js
    const data = await response.json();

    //function to store data in localStorage
    addBgToLocalStorage(data);

    //function to render background image
    renderBackground();

    //function to display photographer name and Unsplash link
    attributePhotographer();
  } catch (error) {
    console.error("API call failed: ", error);
    alert(`Nåt gick fel. Kunde inte hämta bakgrundsbild. ${error.message}`);
  }
}

//------------------------------------------------------------
// Function store background data in an object in localStorage
//------------------------------------------------------------
function addBgToLocalStorage(payload) {
  //store relevant info in objekt
  backgroundObj = {
    url: payload.urls.regular,
    portfolio: payload.user.portfolio_url,
    user: payload.user.name,
  };
  try {
    //save backgroundObj in localStorage
    localStorage.setItem("background", JSON.stringify(backgroundObj));
  } catch (error) {
    console.error("Could not save to localStorage: ", error);
  }
}
