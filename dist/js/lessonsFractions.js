// Get references to the necessary elements
const carousel = document.querySelector('.fraction-carousel');
const lessons = document.querySelectorAll('.fraction-lesson');
let currentPosition = 0;

// Function to show the lesson at the specified index
function showLesson(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Get references to the previous and next buttons
const previousBtn = document.querySelector('.fraction-previous-btn');
const nextBtn = document.querySelector('.fraction-next-btn');

// Event listener for previous button
previousBtn.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    showLesson(currentPosition);
  }
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
  if (currentPosition < lessons.length - 1) {
    currentPosition++;
    showLesson(currentPosition);
  }
});