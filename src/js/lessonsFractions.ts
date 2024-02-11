// Get references to the necessary elements
const carousel = <HTMLElement>document.querySelector(".fraction-carousel");

const lessons = <NodeListOf<Element>>(
  document.querySelectorAll(".fraction-lesson")
);
let currentPosition = 0;

// Function to show the lesson at the specified index
function showLesson(index: number): void {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Get references to the previous and next buttons
const previousBtn = <HTMLElement>(
  document.querySelector(".fraction-previous-btn")
);
const nextBtn = <HTMLElement>document.querySelector(".fraction-next-btn");

// Event listener for previous button
previousBtn.addEventListener("click", () => {
  if (currentPosition > 0) {
    currentPosition--;
    showLesson(currentPosition);
  }
});

// Event listener for next button
nextBtn.addEventListener("click", () => {
  if (currentPosition < lessons.length - 1) {
    currentPosition++;
    showLesson(currentPosition);
  }
});
