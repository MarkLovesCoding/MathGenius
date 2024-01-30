"use strict";
// import { carousel } from "./domElements"
// Get references to the necessary elements
// const carouselContainer = document.querySelector('.fraction-carousel-container') as HTMLElement
const carouselItems = Array.from(document.querySelectorAll(".fraction-lesson"));
const previousButton = (document.querySelector(".fraction-previous-btn"));
const nextButton = document.querySelector(".fraction-next-btn");
// Initialize variables
let currentIndex = 0;
// let currMaxHeight:number = 0;
// const maxIndex:number = carouselItems.length - 1;
// const itemWidth:number = carouselContainer.getBoundingClientRect().width;
// Add event listeners for previous and next buttons
if (previousButton)
    previousButton.addEventListener("click", showPreviousItem);
if (nextButton)
    nextButton.addEventListener("click", showNextItem);
// Function to show the previous carousel item
function showPreviousItem() {
    carouselItems[currentIndex].classList.remove("active");
    currentIndex =
        (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.add("active");
}
// Function to show the next carousel item
function showNextItem() {
    carouselItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("active");
}
// Show the first carousel item initially
carouselItems[currentIndex].classList.add("active");
