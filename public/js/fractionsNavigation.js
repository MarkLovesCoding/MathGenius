const carouselContainer = document.querySelector('.fraction-carousel-container');
const carousel = document.querySelector('.fraction-carousel');
const carouselItems = Array.from(document.querySelectorAll('.fraction-lesson'));
const previousButton = document.querySelector('.fraction-previous-btn');
const nextButton = document.querySelector('.fraction-next-btn');

let currentIndex = 0;
const maxIndex = carouselItems.length - 1;
const itemWidth = carouselContainer.offsetWidth;

previousButton.addEventListener('click', showPreviousItem);
nextButton.addEventListener('click', showNextItem);

function showPreviousItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
  // carousel.style.transform = `translateX(calc(-${currentIndex} * (100% + 20px)))`;
}

function showNextItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
  // carousel.style.transform = `translateX(calc(-${currentIndex} * (100% + 20px)))`;
}

// Show the first item initially
carouselItems[currentIndex].classList.add('active');
