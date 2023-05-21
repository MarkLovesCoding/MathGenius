import * as utilMethods from '../ulils.js';
import { state } from '../state.js';
import * as questionLogic from '../sharedQuestionLogicSolo.js';
import { flashAnswer, flashCard, flashNumOne, flashNumTwo, flashOpOne } from '../domElements.js';
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

flashCard.addEventListener("mousedown", flashHandler, false); // Add a mousedown event listener to the flashCard element that handles flipping the card and checking the answer

;
window.onload = function () {
  let operators = utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"));
  state.activeOperators = sessionStorage.getItem("activeOperators");

  // sessionStorage.setItem("",operators)
  // questionLogic.newGeneralQuestion(flashOpOne,flashNumOne,flashNumTwo,state.activeOperators)
  questionLogic.newQuestion('flash', operators);
};