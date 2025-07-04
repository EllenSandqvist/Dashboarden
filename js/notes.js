const noteBoard = document.getElementById("note-board");
const deleteNotesBtn = document.getElementById("delete-notes");
let storedNotes = localStorage.getItem("notes") || "";

//function call to render notes
renderNotes();

//--------------------------------------------------------------
// Function to render notes
//--------------------------------------------------------------
function renderNotes() {
  noteBoard.value = storedNotes;
}

//--------------------------------------------------------------
// Eventlistener on noteboard that "listens" to input
//--------------------------------------------------------------
noteBoard.addEventListener("input", () => {
  storedNotes = noteBoard.value;

  //saving notes in localStorage
  saveToLocalStorage(storedNotes);
});

//--------------------------------------------------------------
// Function to save notes to localStorage
//--------------------------------------------------------------
function saveToLocalStorage(text) {
  try {
    localStorage.setItem("notes", text);
  } catch (error) {
    console.error("Could not save to localStorage: ", error);
    alert(
      `Nåt gick fel. Dina anteckningar kunde inte sparas. ${error.message}`
    );
  }
}

//--------------------------------------------------------------
// Function for deleting notes
//--------------------------------------------------------------
deleteNotesBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Vill du verkligen radera alla anteckningar?");

  if (confirmDelete) {
    localStorage.removeItem("notes");
    storedNotes = "";
    renderNotes();
  }
});
