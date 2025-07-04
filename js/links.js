//variables for needed HTML-elements
const addLinkBtn = document.getElementById("add-link-button");
const linkModal = document.getElementById("link-modal");
const closeLinkModal = document.getElementById("link-modal-close");
const saveLinkBtn = document.getElementById("save-link-button");

/* if there is a linkArray in localStorage convert it to js and store in linkArray,
otherwise store an empty array */
const savedLinks = JSON.parse(localStorage.getItem("links")) || [];

//function call to render links
renderLinks();

//------------------------------------------------------------
// Function to render links
//------------------------------------------------------------
function renderLinks() {
  const linkContainer = document.querySelector(".link-container");
  linkContainer.innerHTML = "";

  //use map() to generate html element for the dashboard
  //add index to deleteLink function call to easily find right link to remove
  savedLinks.forEach((link, index) => {
    const linkDiv = document.createElement("div");
    linkDiv.className = "link-div";

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-regular fa-trash-can";
    deleteBtn.addEventListener("click", () => deleteLink(index));

    //url to get favicons through google
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.linkUrl}&sz=32`;

    linkDiv.innerHTML = `
                    <div class="favicon-div">
                        <img class="favicon" src="${faviconUrl}">
                        <a class="links" href="${link.linkUrl}" target="_blank">
                            <h3 class="link-h3">${link.linkName}</h3>
                        </a>
                    </div>
            `;

    linkDiv.appendChild(deleteBtn);
    linkContainer.appendChild(linkDiv);
  });
}

//------------------------------------------------------------
// Function to save links
//------------------------------------------------------------
saveLinkBtn.addEventListener("click", (event) => {
  //prevent page from reloading
  event.preventDefault();

  const modalForm = document.querySelector("form");

  //if statement to check so form is correct filled
  if (modalForm.checkValidity()) {
    console.log("The form is correctly filled!");
    //add form info to link object
    let newLink = {
      linkName: document.getElementById("link-name").value,
      linkUrl: document.getElementById("link-url").value,
    };

    addLinkToLocalStorage(newLink);

    //update links shown on dashboard
    renderLinks();

    //hide modal and reset form
    linkModal.classList.add("link-modal-hidden");
    modalForm.reset();
  } else {
    alert(
      "Alla fält är inte korrekt ifyllda.\n" +
        "Kom du ihåg https:// i början av webbadressen?\n" +
        "Prova igen!"
    );
  }
});

//------------------------------------------------------------
// Function to add links to localStorage
//------------------------------------------------------------
function addLinkToLocalStorage(link) {
  //add new link to savedLinks
  savedLinks.push(link);
  try {
    //convert savedLinks and save in localStorage
    localStorage.setItem("links", JSON.stringify(savedLinks));
  } catch (error) {
    console.error("Could not save to localStorage: ", error);
    alert(`Nåt gick fel. Dina länkar kunde inte sparas. ${error.message}`);
  }
}

//------------------------------------------------------------
// Function to Show add-links modal
//------------------------------------------------------------
addLinkBtn.addEventListener("click", () =>
  linkModal.classList.remove("link-modal-hidden")
);

//------------------------------------------------------------
// Function to Hide add-links modal
//------------------------------------------------------------
closeLinkModal.addEventListener("click", () =>
  linkModal.classList.add("link-modal-hidden")
);

//------------------------------------------------------------
// Function to Delete links
//------------------------------------------------------------
function deleteLink(linkIndex) {
  //remove link at specified index
  savedLinks.splice(linkIndex, 1);
  updateLocalStorage();

  //call renderLinks to update links shown on dashboard
  renderLinks();
}

//------------------------------------------------------------
// Function to update localStorage
//------------------------------------------------------------
function updateLocalStorage() {
  try {
    /* if linkArray is empty remove links from localStorage,
        otherwise update the stored array */
    if (savedLinks.length === 0) {
      localStorage.removeItem("links");
    } else {
      localStorage.setItem("links", JSON.stringify(savedLinks));
    }
  } catch (error) {
    console.error("Could not save to localStorage: ", error);
  }
}
