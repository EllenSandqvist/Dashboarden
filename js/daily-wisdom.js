//call to fetch a random quote
fetchQuote();

//----------------------------------------------------
// Function to fetch a random quote
//----------------------------------------------------
async function fetchQuote() {
  try {
    // Fetch a random quote from the QuoteSlate API
    const response = await fetch(
      "https://quoteslate.vercel.app/api/quotes/random"
    );

    //check if response is ok
    if (!response.ok) {
      //if not, throw error
      throw new Error(`HTTP-error: Status ${response.status}`);
    }

    //Convert response to JavaScript
    const data = await response.json();

    //function to check quote length
    checkQuoteLength(data);
  } catch (error) {
    console.error("API call failed: ", error);
    alert(`Nåt gick fel. Kunde inte hämta citat. ${error.message}`);
  }
}

//----------------------------------------------------
// Function to check quote length
//----------------------------------------------------
function checkQuoteLength(data) {
  if (data.quote.length > 90) {
    //if quote is longer than 90 char fetch new quote
    fetchQuote();
  } else {
    //if quote length <= 90 display quote
    displayQuote(data);
  }
}

//----------------------------------------------------
// Function to display quote
//----------------------------------------------------
function displayQuote(data) {
  const quoteDiv = document.querySelector(".quote-div");

  const quotePara = document.createElement("p");
  quotePara.classList.add("quote-para");
  quotePara.textContent = data.quote;
  quoteDiv.appendChild(quotePara);

  const authorPara = document.createElement("p");
  authorPara.classList.add("author-para");
  authorPara.textContent = data.author;
  quoteDiv.appendChild(authorPara);
}
