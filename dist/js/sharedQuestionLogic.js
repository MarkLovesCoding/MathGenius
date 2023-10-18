import { state } from './state.js';
import * as utilMethods from './utils.js';
import { flashNumOne, flashNumTwo, flashOpOne } from './domElements.js';
import { mcNumOne, mcNumTwo, mcOpOne } from './domElements.js';
import { mcQuizNumOne, mcQuizNumTwo, mcQuizOpOne } from './domElements.js';
import { quizNumOne, quizNumTwo, quizOpOne } from './domElements.js';
import { gameNumOne, gameNumTwo, gameOpOne } from './domElements.js';
export function newGeneralQuestion(opEl, n1El, n2El, operator, func) {
  let activeHighVal = sessionStorage.getItem("activeHighVal");
  let activeLowVal = sessionStorage.getItem("activeLowVal");
  let activeMultiplyHighVal = sessionStorage.getItem("activeMultiplyHighVal");
  let activeMultiplyLowVal = sessionStorage.getItem("activeMultiplyLowVal");

  // Get a random operator from the list of operators
  let o1 = operator;

  // Generate two random numbers between 0 and the active high value
  let n1 = utilMethods.randomNumber(0, activeHighVal);
  let n2 = utilMethods.randomNumber(0, activeHighVal);

  // If the operator is multiplication, generate two random numbers between the active multiply low and high values
  if (o1 === "x") {
    n1 = utilMethods.randomNumber(activeLowVal, activeHighVal);
    n2 = utilMethods.randomNumber(activeLowVal, activeHighVal);
  }

  // If the operator is division, generate two random numbers until the first is divisible by the second
  if (o1 === "÷") {
    const nums = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    while (!nums.has(n1 / n2)) {
      n1 = utilMethods.randomNumber(Number(activeLowVal), activeHighVal * 12);
      n2 = utilMethods.randomNumber(Number(activeLowVal), activeHighVal);
      //    if(nums.has(n1 / n2)){break}
      //    else{continue}
    }
  }

  // If the operator is subtraction and the second number is greater than the first, swap them
  if (o1 === "-") {
    if (n2 > n1) {
      let t = n1;
      n1 = n2;
      n2 = t;
    }
  }

  // Set the text content of the HTML elements to the generated numbers and operator
  n1El.textContent = n1;
  n2El.textContent = n2;
  opEl.textContent = o1;

  // If a function was passed in as an argument, call it with the generated numbers and operator as arguments
  if (typeof func == "function") {
    func(n1, n2, o1);
  }
}

// Function to generate a new question based on the specified type
export function newQuestion(type, operator, options) {
  let num1, num2, op1;

  // Load the appropriate section based on the question type
  switch (type) {
    // If the type is "flash", load the "flash" section
    case "flash":
      // Set the values 
      num1 = flashNumOne;
      num2 = flashNumTwo;
      op1 = flashOpOne;
      break;

    // If the type is "multiple-choice", load the "mc" section
    case "multiple-choice":
      // Set the values 
      num1 = mcNumOne;
      num2 = mcNumTwo;
      op1 = mcOpOne;
      break;

    // If the type is "multiple-choice-quiz", load the "mc-quiz" section
    case "multiple-choice-quiz":
      // Set the values 
      num1 = mcQuizNumOne;
      num2 = mcQuizNumTwo;
      op1 = mcQuizOpOne;
      break;

    // If the type is "quiz", load the "quiz" section
    case "quiz":
      // Set the values 
      num1 = quizNumOne;
      num2 = quizNumTwo;
      op1 = quizOpOne;
      break;

    // If the type is "game", load the "game" section
    case "game":
      // Set the values 
      num1 = gameNumOne;
      num2 = gameNumTwo;
      op1 = gameOpOne;
      break;

    // If the type is not recognized, do nothing
    default:
      break;
  }

  // Update the burger menu
  // burgerUpdate();

  // Generate a new question based on the values of num1, num2, and op1
  newGeneralQuestion(op1, num1, num2, operator, options);
}