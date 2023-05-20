import { state } from './state.js'

import * as utilMethods from './ulils.js';
import { flashNumOne, flashNumTwo, flashOpOne } from './domElements.js';
import { mcNumOne, mcNumTwo, mcOpOne } from './domElements.js';
import { mcQuizNumOne, mcQuizNumTwo, mcQuizOpOne, } from './domElements.js';
import { quizNumOne, quizNumTwo, quizOpOne } from './domElements.js';
import {  gameNumOne, gameNumTwo, gameOpOne } from './domElements.js';

export function newGeneralQuestion(opEl, n1El, n2El, operators, func) {

    // Get a random operator from the list of operators
    let o1 = utilMethods.randOp(operators);

    // Generate two random numbers between 0 and the active high value
    let n1 = utilMethods.randomNumber(0, state.activeHighVal);
    let n2 = utilMethods.randomNumber(0, state.activeHighVal);


    // If the operator is multiplication, generate two random numbers between the active multiply low and high values
    if (o1 === "x") {
        n1 = utilMethods.randomNumber(state.activeMultiplyLowVal, state.activeMultiplyHighVal);
        n2 = utilMethods.randomNumber(state.activeMultiplyLowVal, state.activeMultiplyHighVal);
    }

    // If the operator is division, generate two random numbers until the first is divisible by the second
    if (o1 === "÷") {
        while (n1 % n2 != 0) {
            n1 = utilMethods.randomNumber(0, state.activeHighVal);
            n2 = utilMethods.randomNumber(1, state.activeHighVal);
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
    if (func) func(n1, n2, o1);
}

// Function to generate a new question based on the specified type
export function newQuestion(type, operators, options) {
    let num1, num2, op1;

    // Load the appropriate section based on the question type
    switch (type) {
        // If the type is "flash", load the "flash" section
        case "flash":
            // utilMethods.loadSection("flash")

            // Set the values of num1, num2, and op1 based on the flash question
            num1 = flashNumOne;
            num2 = flashNumTwo;
            op1 = flashOpOne;
            break;

        // If the type is "multiple-choice", load the "mc" section
        case "multiple-choice":
            // utilMethods.loadSection("mc")

            // Set the values of num1, num2, and op1 based on the multiple-choice question
            num1 = mcNumOne;
            num2 = mcNumTwo;
            op1 = mcOpOne;
            break;

        // If the type is "multiple-choice-quiz", load the "mc-quiz" section
        case "multiple-choice-quiz":
            // utilMethods.loadSection("mc-quiz")

            // Set the values of num1, num2, and op1 based on the multiple-choice quiz question
            num1 = mcQuizNumOne;
            num2 = mcQuizNumTwo;
            op1 = mcQuizOpOne;
            break;

        // If the type is "quiz", load the "quiz" section
        case "quiz":
            // utilMethods.loadSection("quiz")

            // Set the values of num1, num2, and op1 based on the quiz question
            num1 = quizNumOne;
            num2 = quizNumTwo;
            op1 = quizOpOne;
            break;

        // If the type is "game", load the "game" section
        case "game":
            // utilMethods.loadSection("game")

            // Set the values of num1, num2, and op1 based on the game question
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
    newGeneralQuestion(op1, num1, num2, operators, options);
}

