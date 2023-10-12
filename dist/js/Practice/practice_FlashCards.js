// Import the necessary modules
import * as utilMethods from '../utils.js';
import { state } from '../state.js';
import * as questionLogic from '../sharedQuestionLogic.js';
import { flashAnswer, flashCard, flashNumOne, flashNumTwo, flashOpOne } from '../domElements.js';

// Function to handle the flashCard mousedown event
function flashHandler(e) {
  const ans = utilMethods.calculation(flashNumOne.innerHTML, flashNumTwo.innerHTML, flashOpOne.innerHTML); // Calculate the correct answer using the flashNumOne, flashNumTwo, and flashOpOne elements
  flashAnswer.textContent = ans; // Display the correct answer in the flashAnswer element
  if (this.classList.contains("flip")) {
    // If the flashCard element has the "flip" class, generate a new question
    questionLogic.newQuestion("flash", state.activeOperators);
  }
  this.classList.toggle("flip"); // Toggle the "flip" class on the flashCard element
  e.preventDefault(); // Prevent the default behavior of the mousedown event on the flashCard element
}

// Add mousedown event listener to the flashCard element
flashCard.addEventListener("mousedown", flashHandler, false);

// Window onload event handler
window.onload = function () {
  let operators = utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"));
  state.activeOperators = operators;
  questionLogic.newQuestion('flash', operators);
};