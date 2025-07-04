const h1Header = document.querySelector("h1");

/* store Dashboard-h1 data from localStorage if there is any in headerContent, 
otherwise store h1 text content */
let headerContent =
  localStorage.getItem("Dashboard-h1") || h1Header.textContent;

//call function to render main heading
renderHeading();

//------------------------------------------------------------
// Function to render heading
//------------------------------------------------------------
function renderHeading() {
  h1Header.textContent = headerContent;
}

//--------------------------------------------------------------
// Eventlistener on h1 with callback that updates headerContent
//--------------------------------------------------------------
h1Header.addEventListener("input", () => {
  headerContent = h1Header.textContent;

  //function for saving headercontent to localStorage
  saveHeaderToLocalStorage(headerContent);

  //render heading with updated content
  renderHeading();
});

//--------------------------------------------------------------
// Function to save H1 to localStorage
//--------------------------------------------------------------
function saveHeaderToLocalStorage(heading) {
  try {
    localStorage.setItem("Dashboard-h1", heading);
  } catch (error) {
    console.error("Could not save to localStorage: ", error);
  }
}
