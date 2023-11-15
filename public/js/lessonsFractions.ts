// Get references to the necessary elements
import { carousel } from "./domElements";

const lessons = document.querySelectorAll('.fraction-lesson') as NodeListOf<Element>
let currentPosition = 0;

// Function to show the lesson at the specified index
function showLesson(index: number): void {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Get references to the previous and next buttons
const previousBtn = document.querySelector('.fraction-previous-btn') as HTMLElement
const nextBtn = document.querySelector('.fraction-next-btn') as HTMLElement

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
