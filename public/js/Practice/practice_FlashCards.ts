// Import the necessary modules
import * as utilMethods from "../utils.js";

import * as questionLogic from "../sharedQuestionLogic.js";
// import {  flashElements } from '../domElements.js';
import { Difficulty, Operator } from "../types.js";
// const { numOne: flashNumOne, numTwo: flashNumTwo, opOne: flashOpOne } = flashElements;

const flashCard = <HTMLElement>document.getElementById("flash-card");
const flashAnswer = <HTMLElement>document.getElementById("flash-answer");
const flashNumOne = <HTMLElement>document.getElementById("flash-first-number");
const flashNumTwo = <HTMLElement>document.getElementById("flash-second-number");
const flashOpOne = <HTMLElement>document.getElementById("flash-first-operator");
// Function to handle the flashCard mousedown event
function flashHandler(this: HTMLElement, e: MouseEvent) {
  const ans = utilMethods.calculation(
    parseInt(flashNumOne.innerHTML),
    parseInt(flashNumTwo.innerHTML),
    flashOpOne.innerHTML as Operator
  ); // Calculate the correct answer using the flashNumOne, flashNumTwo, and flashOpOne elements
  flashAnswer.textContent = String(ans); // Display the correct answer in the flashAnswer element
  if (this.classList.contains("flip")) {
    const operator = <Operator>sessionStorage.getItem("activeOperators");
    // If the flashCard element has the "flip" class, generate a new question
    if (operator) questionLogic.newQuestion("flash", operator);
    else throw new Error("Session Storage Item not retrieved");
  }
  this.classList.toggle("flip"); // Toggle the "flip" class on the flashCard element
  e.preventDefault(); // Prevent the default behavior of the mousedown event on the flashCard element
}

// Add mousedown event listener to the flashCard element
flashCard.addEventListener("mousedown", flashHandler, false);

// Window onload event handler
window.onload = function () {
  let operator = <Operator>sessionStorage.getItem("activeOperators");

  let difficulty = <Difficulty>sessionStorage.getItem("activeDifficulty");
  if (operator && difficulty) {
    utilMethods.updateGeneralSelected(operator, difficulty);

    questionLogic.newQuestion("flash", operator);
  } else {
    throw new Error("Session Storage Item not retrieved");
  }
};
