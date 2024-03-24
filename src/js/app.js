const cardContainer = document.getElementById('cards-container');
const showMoreButton = document.getElementById('showMoreBtn');
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
}

function renderCards() {
  cardContainer.innerHTML = ''; // Clear existing cards
  cardsData.slice(0, visibleCards).forEach(card => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });
  toggleShowMoreButton();
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('dinosaur-section__card');
  const truncatedDescription = card.description.length > 150 ? card.description.substring(0, 150) + "..." : card.description;

  cardElement.innerHTML = `
  <img
  src="${card.imageSrc}"
  class="dinosaur-section__card-img"
  alt="Image Description"
/>
<button class="dinosaur-section__card-button">
  Show Details
</button>

<div class="dinosaur-section__card-details">
  <p>
  Import Description Here and Hide when the button is clicked
  </p>
</div>
  `;
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

displayCards();
