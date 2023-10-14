// Get references to the necessary elements
const carouselContainer = document.querySelector('.fraction-carousel-container');
const carousel = document.querySelector('.fraction-carousel');
const carouselItems = Array.from(document.querySelectorAll('.fraction-lesson'));
const previousButton = document.querySelector('.fraction-previous-btn');
const nextButton = document.querySelector('.fraction-next-btn');

// Initialize variables
let currentIndex = 0;
let currMaxHeight = 0;
const maxIndex = carouselItems.length - 1;
const itemWidth = carouselContainer.offsetWidth;

// Add event listeners for previous and next buttons
previousButton.addEventListener('click', showPreviousItem);
nextButton.addEventListener('click', showNextItem);

// Function to show the previous carousel item
function showPreviousItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
}

// Function to show the next carousel item
function showNextItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
}

// Show the first carousel item initially
carouselItems[currentIndex].classList.add('active');