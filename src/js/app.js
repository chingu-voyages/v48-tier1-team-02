// Get references to HTML elements

const cardContainer = document.getElementById("cards-container");
const showMoreButton = document.getElementById("showMoreBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Initialize the variables 
let cardsData = [];
let visibleCards = 20;
let totalCards;

// Function to fetch Cards data
async function fetchData() {
  const response = await fetch("assets/json/dino.json");
  const data = await response.json();
  cardsData = data;
  totalCards = cardsData.length;
}

// Event listener on searchBtn
searchBtn.addEventListener("click", () => {
  handleSearch();
  searchBtn.innerText = "";
  window.location.href = "#dinosaurs";
});

// Function to display cards
async function displayCards() {
  await fetchData(); 
  renderCards(); 
  showMoreButton.addEventListener("click", loadMoreCards);
  // Event listener on searchInput
  searchInput.addEventListener("keyup", (e) => {
    // Checking if Enter key is pressed
    if (e.key === "Enter") {
      handleSearch();
    }
    // Calling the showSearchSuggestions function to show suggestions
    showSearchSuggestions(searchInput.value.toLowerCase());
  });
}

// Function to renderCards on the page
function renderCards(filteredData) {
  cardContainer.innerHTML = ""; 
  const dataToRender = filteredData || cardsData;
  // if No result found (diaplaying message)
  if (dataToRender.length === 0) {
    cardContainer.innerHTML = `<h2>No results found for <span>${searchInput.value}</span></h2>`;
  } else {
    // if result found (displaying cards)
    dataToRender.slice(0, visibleCards).forEach((card) => {
      const cardElement = createCardElement(card);
      cardContainer.appendChild(cardElement); 
    });
  }
  toggleShowMoreButton(); 
}

// Function to create card
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("dinosaur-section__card");
  // Checking if the card has description or not (and keeping des shorter)
  let truncatedDescription =
    card.description.length > 150
      ? card.description.substring(0, 150) + "..."
      : card.description;
  if (truncatedDescription.trim() === "N/A") {
    truncatedDescription = "This dinosaur has no description";
  }
  // Card Details Container here
  const cardDetailsDiv = document.createElement("div");
  cardDetailsDiv.classList.add("dinosaur-section__card-details");
  // Adding card details
  cardDetailsDiv.innerHTML = `
    <p><strong>Type: </strong>${card.typeOfDinosaur}</p>
    <p><strong>Length: </strong>${card.length}m</p>
    <p><strong>Diet: </strong>${card.diet}</p>
    <p><strong>Found In: </strong>${card.foundIn}</p>
    <p><strong>Named By: </strong>${card.namedBy}</p>
    <p><strong>Type Species: </strong>${card.typeSpecies}</p>
    <p>${truncatedDescription}</p>
  `;

  // Adding card Info
  cardElement.innerHTML += `
  <div class="dinosaur-section__card-item">
  <img
  src="${card.imageSrc}"
  class="dinosaur-section__card-img"
  alt="Image Description"
  />
  <button class="dinosaur-section__card-button  button">
  ${card.name}
  <i class="fa-sharp fa-regular fa-circle-play fa-rotate-90 arrow-icon" style="color: #e0fbfc;"></i>
  </button>
  </div>
  `;

  cardElement.appendChild(cardDetailsDiv);
  // Show more button
  const button = cardElement.querySelector(".dinosaur-section__card-button");
  button.addEventListener("click", () => {
    // Toggle the Card Details
    cardDetailsDiv.classList.toggle("dinosaur-section__card-details--visible");
    console.log("clicked");
  });

  return cardElement;
}

// Load more Cards function 
function loadMoreCards() {
  visibleCards += 8;
  renderCards();
}

// Toggle Show More Button
function toggleShowMoreButton() {
  if (visibleCards >= totalCards) {
    showMoreButton.style.display = "none"; 
  } else {
    showMoreButton.style.display = "block";
  }
}

// Handle Search Function
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  // Filter cardsData based on search
  const filteredData = cardsData.filter((card) => {
    return card.name.toLowerCase().startsWith(searchTerm);
  });

  // Render filtered cards
  renderCards(filteredData); 
  // Scroll to dinosaurs section
  window.location.href = "#dinosaurs"; 
  // hidding search suggestions
  const SuggestionsDiv = document.getElementById("suggestionContainer");
  SuggestionsDiv.style.display = "none";
}


// Show Search Suggestion function
function showSearchSuggestions(searchTerm) {
  const searchSuggestionsDiv = document.getElementById("suggestionContainer");

  // Filtering the suggestions based on search
  const suggestions = cardsData.filter((card) =>
    card.name.toLowerCase().startsWith(searchTerm)
  );
  searchSuggestionsDiv.innerHTML = "";
  // Creating div for each suggestion
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.textContent = suggestion.name;
    suggestionElement.classList.add("search-suggestions"); 
    // Event listener on suggestion
    suggestionElement.addEventListener("click", () => {
      searchInput.value = suggestion.name; 
      searchSuggestionsDiv.style.display = "none"; 
    });
    searchSuggestionsDiv.appendChild(suggestionElement);
  });
  // Showing suggestions
  searchSuggestionsDiv.style.display =
    suggestions.length > 0 ? "block" : "none";
}


// Display Cards
displayCards();
