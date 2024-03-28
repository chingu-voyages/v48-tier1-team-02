const cardContainer = document.getElementById('cards-container');
const showMoreButton = document.getElementById('showMoreBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
let cardsData = [];
let visibleCards = 20;
let totalCards;

async function fetchData() {
  const response = await fetch('assets/json/dino.json');
  const data = await response.json();
  cardsData = data;
  totalCards = cardsData.length;
}

async function displayCards() {
  await fetchData();
  renderCards();
  showMoreButton.addEventListener('click', loadMoreCards);
  searchInput.addEventListener('input', handleSearch);
  // searchBtn.addEventListener('click', searchBtnClick);
}

function renderCards(filteredData) {
  cardContainer.innerHTML = ''; // Clear existing cards
  const dataToRender = filteredData || cardsData;
  
  if (dataToRender.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No dinosaurs found matching your search.';
    cardContainer.appendChild(noResultsMessage);
  } else {
    dataToRender.slice(0, visibleCards).forEach(card => {
      const cardElement = createCardElement(card);
      cardContainer.appendChild(cardElement);
    });
  }
  toggleShowMoreButton();
}


function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('dinosaur-section__card');
  let truncatedDescription = card.description.length > 150 ? card.description.substring(0, 150) + "..." : card.description;
  if (truncatedDescription.trim() === "N/A") {
    truncatedDescription = "This dinosaur has no description";
  }
  // Card Details Container here
  const cardDetailsDiv = document.createElement('div');
  cardDetailsDiv.classList.add('dinosaur-section__card-details');
  cardDetailsDiv.innerHTML = `
    <p><strong>Type: </strong>${card.typeOfDinosaur}</p>
    <p><strong>Length: </strong>${card.length}m</p>
    <p><strong>Diet: </strong>${card.diet}</p>
    <p><strong>Found In: </strong>${card.foundIn}</p>
    <p><strong>Named By: </strong>${card.namedBy}</p>
    <p><strong>Type Species: </strong>${card.typeSpecies}</p>
    <p>${truncatedDescription}</p>
  `;
  // cardDetailsDiv.style.display = 'none';
  
  cardElement.innerHTML += `
  <img
  src="${card.imageSrc}"
  class="dinosaur-section__card-img"
  alt="Image Description"
  />
  <button class="dinosaur-section__card-button">
  ${card.name}
  </button>
  `;
  
  cardElement.appendChild(cardDetailsDiv);
  const button = cardElement.querySelector('.dinosaur-section__card-button');
  button.addEventListener('click', () => {
    // cardDetailsDiv.classList.remove('dinosaur-section__card-details');
    cardDetailsDiv.classList.toggle('dinosaur-section__card-details--visible');
    // button.classList.toggle('dinosaur-section__card-button--active');
    console.log("clicked")
  });

  return cardElement;
}


function loadMoreCards() {
  visibleCards += 8;
  renderCards();
}

function toggleShowMoreButton() {
  if (visibleCards >= totalCards) {
    showMoreButton.style.display = 'none'; // Hide button when all cards are shown
  } else {
    showMoreButton.style.display = 'block';
  }
}


function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCards = cardsData.filter(card => card.name.toLowerCase().startsWith(searchTerm));
  renderCards(filteredCards);
}

// function searchBtnClick() {
//   handleSearch();
//   window.location.hash = '#dinosaurs';
// }
displayCards();

searchBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default behavior of the search button click
  handleSearch();
  // Redirect to the section containing dinosaurs
  window.location.hash = '#dinosaurs';
});