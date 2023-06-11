const carouselContainer = document.querySelector('.fraction-carousel-container');
const carousel = document.querySelector('.fraction-carousel');
const carouselItems = Array.from(document.querySelectorAll('.fraction-lesson'));
const previousButton = document.querySelector('.fraction-previous-btn');
const nextButton = document.querySelector('.fraction-next-btn');

let currentIndex = 0; 
let currMaxHeight= 0;
const maxIndex = carouselItems.length - 1;
const itemWidth = carouselContainer.offsetWidth;

previousButton.addEventListener('click', showPreviousItem);
nextButton.addEventListener('click', showNextItem);


// function updateActiveHeight(items) {

//   // Loop through the siblings
//   for (let i = 0; i < items.length; i++) {
//     const sibling = items[i];

//     // Check if the sibling has the 'active' class
//     if (sibling.classList.contains('active')) {
//       // Retrieve the height of the active sibling
//       const height = sibling.offsetHeight;
//       return height;
//     }
//   }

//   // If no active sibling is found, return a default height value
//   return 0;
// }



function showPreviousItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
//   console.log(updateActiveHeight(carouselItems))
// currMaxHeight = updateActiveHeight(carouselItems)

// carouselItems[currentIndex].style.maxHeight = currMaxHeight + 'px'

  // carousel.style.transform = `translateX(calc(-${currentIndex} * (100% + 20px)))`;
}

function showNextItem() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
//   console.log(updateActiveHeight(carouselItems))
// currMaxHeight = updateActiveHeight(carouselItems)

// carouselItems[currentIndex].style.maxHeight = currMaxHeight + 'px'


  // carousel.style.transform = `translateX(calc(-${currentIndex} * (100% + 20px)))`;
}

// Show the first item initially
carouselItems[currentIndex].classList.add('active');
// currMaxHeight = updateActiveHeight(carouselItems)
// console.log(updateActiveHeight(carouselItems))

// carouselItems[currentIndex].style.maxHeight = currMaxHeight + 'px'
