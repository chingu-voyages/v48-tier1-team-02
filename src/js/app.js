// Get references to HTML elements

const cardContainer = document.getElementById("cards-container");
const showMoreButton = document.getElementById("showMoreBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const suggestionList = document.getElementById("suggestionContainer");
let mobileMenuBtn = document.querySelector(".navbar__mobile-menu-button");
let scrollBtn = document.querySelector(".scroll-button");

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
if (searchBtn) {
searchBtn.addEventListener("click", () => {
  handleSearch();
  window.location.href = "#dinosaurs";
});
}

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
    } else if (e.key === "Escape") {
      //Hide Suggestion List
      suggestionList.style.display = "none";
    } else {
      // Calling the showSearchSuggestions function to show suggestions
      showSearchSuggestions(searchInput.value.toLowerCase());
    }
  });

  //Show suggestions if input not empty and in focus
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length) {
      suggestionList.style.display = "block";
    }
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

  let cardDescription = card.description;
  if (cardDescription === "N/A") {
    cardDescription = "This dinosaur has no description.";
  }

  // Card Details Container here
  const cardDetailsDiv = document.createElement("div");
  cardDetailsDiv.classList.add("dinosaur-section__card-details");
  // Adding card details
  cardDetailsDiv.innerHTML = `
    <p><strong>Type: </strong>${card.typeOfDinosaur}</p>
    <p><strong>Length: </strong>${card.length}m</p>
    <p><strong>Diet: </strong>${card.diet}</p>
    <p><strong>When Lived: </strong>${card.whenLived}</p>
    <p><strong>Found In: </strong>${card.foundIn}</p>
    <p><strong>Named By: </strong>${card.namedBy}</p>
    <p><strong>Type Species: </strong>${card.typeSpecies}</p>
    <p><strong>Description: </strong>${cardDescription}</p>
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

  //Rotate the card with the button click
  const button = cardElement.querySelector(".dinosaur-section__card-button");
  button.addEventListener("click", () => {
    cardElement.classList.toggle("is-flipped");
  });

  //Rotate the card with the click on detail's side
  cardDetailsDiv.addEventListener("click", function () {
    cardElement.classList.toggle("is-flipped");
  });

  /*
  //Rotate the card with the click on all card's space
  cardElement.addEventListener("click", function () {
        cardElement.classList.toggle("is-flipped");
    });*/

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
  //Clear search input
  searchInput.value = "";
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
      // Execute search here
      handleSearch();
    });
    searchSuggestionsDiv.appendChild(suggestionElement);
  });
  // Showing suggestions
  searchSuggestionsDiv.style.display =
    suggestions.length > 0 ? "block" : "none";
}

/*Open/close mobile menu*/
function showMobileMenu() {
  let navLinks = document.querySelector(".navbar__links");
  let linkItems = document.querySelectorAll(".navbar__links-item");

  //Open mobile menu and change icon
  if (navLinks.classList.toggle("is-open")) {
    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; //Close
  } else {
    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  //Close navmenu if one of the link clicked
  for (link of linkItems) {
    link.addEventListener("click", showMobileMenu);
  }
}

//Show scroll button
function showScrollBtn() {
  scrollBtn.classList.toggle("scroll-button--active", window.scrollY > 700);
}

//Scroll to main page
function moveToTopScreen() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//Check click without suggestion list
function clickOnFreeSpace() {
  document.addEventListener("click", (event) => {
    const withinSuggestionList = event.composedPath().includes(suggestionList);
    const withinInput = event.composedPath().includes(searchInput);

    if (!withinInput && !withinSuggestionList) {
      //Hide Suggestion List
      suggestionList.style.display = "none";
    }
  });
}

// Display Cards
displayCards();

//Show mobile menu
mobileMenuBtn.addEventListener("click", showMobileMenu);

//Check the clicking scroll up button.
scrollBtn.addEventListener("click", moveToTopScreen);
window.addEventListener("scroll", showScrollBtn);

// Click on free place to close Suggestion List
clickOnFreeSpace();
