const carousel = document.querySelector('.fraction-carousel');
const lessons = document.querySelectorAll('.fraction-lesson');
let currentPosition = 0;

function showLesson(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

const previousBtn = document.querySelector('.fraction-previous-btn');
const nextBtn = document.querySelector('.fraction-next-btn');

previousBtn.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    showLesson(currentPosition);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPosition < lessons.length - 1) {
    currentPosition++;
    showLesson(currentPosition);
  }
});

