import * as utilMethods from "./utils.js";

import { ActivityType, Operator } from "./types.js";

const gameNumOne = <HTMLElement>document.getElementById("game-first-number");
const gameNumTwo = <HTMLElement>document.getElementById("game-second-number");
const gameOpOne = <HTMLElement>document.getElementById("game-first-operator");
const flashNumOne = <HTMLElement>document.getElementById("flash-first-number");
const flashNumTwo = <HTMLElement>document.getElementById("flash-second-number");
const flashOpOne = <HTMLElement>document.getElementById("flash-first-operator");
const mcNumOne = <HTMLElement>document.getElementById("mc-first-number");
const mcNumTwo = <HTMLElement>document.getElementById("mc-second-number");
const mcOpOne = <HTMLElement>document.getElementById("mc-first-operator");
const mcQuizNumOne = <HTMLElement>(
  document.getElementById("mc-quiz-first-number")
);
const mcQuizNumTwo = <HTMLElement>(
  document.getElementById("mc-quiz-second-number")
);
const mcQuizOpOne = <HTMLElement>(
  document.getElementById("mc-quiz-first-operator")
);
const quizNumOne = <HTMLElement>document.getElementById("quiz-first-number");
const quizNumTwo = <HTMLElement>document.getElementById("quiz-second-number");
const quizOpOne = <HTMLElement>document.getElementById("quiz-first-operator");

export function newGeneralQuestion(
  opEl: HTMLElement,
  n1El: HTMLElement,
  n2El: HTMLElement,
  operator: Operator,
  func?: (arg1: number, arg2: number, arg3: Operator) => void
): void {
  let activeHighVal: string | null = sessionStorage.getItem("activeHighVal");
  let activeLowVal: string | null = sessionStorage.getItem("activeLowVal");

  let activeHighValNumber: number = Number(activeHighVal);
  let activeLowValNumber: number = Number(activeLowVal);
  // Get a random operator from the list of operators
  let o1: Operator = operator;

  // Generate two random numbers between 0 and the active high value
  let n1: number = utilMethods.randomNumber(0, activeHighValNumber);
  let n2: number = utilMethods.randomNumber(0, activeHighValNumber);

  // If the operator is multiplication, generate two random numbers between the active multiply low and high values
  if (o1 === "x") {
    n1 = utilMethods.randomNumber(activeLowValNumber, activeHighValNumber);
    n2 = utilMethods.randomNumber(activeLowValNumber, activeHighValNumber);
  }

  // If the operator is division, generate two random numbers until the first is divisible by the second
  if (o1 === "÷") {
    const nums = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    while (!nums.has(n1 / n2)) {
      n1 = utilMethods.randomNumber(
        activeLowValNumber,
        activeHighValNumber * 12
      );
      n2 = utilMethods.randomNumber(activeLowValNumber, activeHighValNumber);
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
  if (n1El) n1El.textContent = String(n1);
  if (n2El) n2El.textContent = String(n2);
  if (opEl) opEl.textContent = o1;

  // If a function was passed in as an argument, call it with the generated numbers and operator as arguments
  if (func) {
    func(n1, n2, o1);
  }
}

// Function to generate a new question based on the specified type
export function newQuestion(
  type: ActivityType,
  operator: Operator,
  options?: (n1: number, n2: number, o1: Operator) => void
): void {
  let num1: HTMLElement | null,
    num2: HTMLElement | null,
    op1: HTMLElement | null;

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

    // If the type is not recognized, default to quiz type
    default:
      const exhaustiveCheck: never = type;
      return exhaustiveCheck;
  }

  // Update the burger menu

  // Generate a new question based on the values of num1, num2, and op1
  if (op1 && num1 && num2) {
    newGeneralQuestion(op1, num1, num2, operator, options);
  }
}
