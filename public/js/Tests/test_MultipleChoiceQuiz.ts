

import * as utilMethods from '../utils.js';
import { state } from '../state.js'
import * as questionLogic from '../sharedQuestionLogic.js';
import { updateBadgeStatus } from '../badges.js';
import { animateBadge } from '../badgeEarned.js';
import { mcQuizOptions } from '../domElements.js';




//////MCQUIZ

/**
 * resets the relevant state values.
 */
function finishMCQuiz(): void {
  // add state db flow

  // Reset state values
  state.mcQuizActive.mcqNumAnswered = 0;
  state.mcQuizActive.mcqNumCorrect = 0;
  state.mcQuizActive.mcqFailedAttempts = 0;
}

const mcQuestionNumber = document.getElementById("mc-question-number") as HTMLElement
const mcQuestionsCorrect = document.getElementById("mc-questions-correct") as HTMLElement
const mcQuizModal = document.getElementById("mc-quiz-modal") as HTMLElement
const mcQuizAmountCorrect = document.getElementById("mc-quiz-amountCorrect") as HTMLElement
const mcQuizAmountCorrectPercentage = document.getElementById("mc-quiz-amountCorrectPercentage") as HTMLElement


async function mcQuizShowScore():Promise<void> {
  // Update text content of elements with score information
  mcQuizAmountCorrect.textContent = state.mcQuizActive.mcqNumCorrect.toString();
  mcQuizAmountCorrectPercentage.textContent = utilMethods.percentage(state.mcQuizActive.mcqNumCorrect, state.mcQuizActive.mcqNumAnswered).toString() + "%";
  // Show quiz modal and add emphasis effect
  mcQuizModal.style.visibility = "visible";
  mcQuizModal.style.zIndex = "101";
  utilMethods.emphasize(mcQuizModal);
  // Wait for a delay, then hide quiz modal and remove emphasis effect
  await utilMethods.delay(1600);
  mcQuizModal.style.visibility = "hidden";
  mcQuizModal.style.zIndex = "0";
}

function updateMCQuizPage(): void {
  // Update text content of elements with question and score information
  const numCorrect: number = state.mcQuizActive.mcqNumCorrect;
  // const numQuestion: number = state.mcQuizActive.mcqNumQuestion;
  const numAnswered: number = state.mcQuizActive.mcqNumAnswered;
  // if(mcQuestionNumber && mcQuestionsCorrect){
    mcQuestionNumber.textContent = numAnswered.toString();
    mcQuestionsCorrect.textContent = numCorrect.toString();
  // } else throw new Error("Dom not loaded: Multiple Choice Question Numbers")


}

async function checkMCQAnswered(): Promise<void> {
  // If all questions have been answered, show score and finish quiz
  if (state.mcQuizActive.mcqNumAnswered == state.mcQuizActive.mcqNumQuestion) {

    if (state.mcQuizActive.mcqNumCorrect == 10) {
      const activeDifficulty: string | null = sessionStorage.getItem("activeDifficulty")
      const activeOperator: string | null = sessionStorage.getItem("activeOperators")
      await animateBadge()
      if (activeDifficulty && activeOperator) {
        await updateBadgeStatus("mcquiz", activeDifficulty, activeOperator, true)
      } else throw new Error("Error retrieving diff and operator from session Storage")

    }
    else {
      mcQuizShowScore()

    }
    finishMCQuiz()
  }
}




async function mcQuizAnswerCheck(bool: boolean, correctEl: HTMLElement, falseEl: null | HTMLElement = null): Promise<void> {
  // Check if the answer is correct or not
  const operator: string | null = sessionStorage.getItem("activeOperators")
  if (bool) {
    // If the answer is correct:
    // Increment the number of correct answers and answered questions
    if (state.mcQuizActive.mcqFailedAttempts === 0) {
      state.mcQuizActive.mcqNumCorrect += 1;
      state.mcQuizActive.mcqNumAnswered += 1;
    }
    // If there were failed attempts before, increment the number of answered questions only
    if (state.mcQuizActive.mcqFailedAttempts > 0) {
      state.mcQuizActive.mcqNumAnswered += 1;
    }
    state.mcQuizActive.mcqFailedAttempts = 0;
    // Check if all questions are answered and show the score if true. Animate the correct element 
    checkMCQAnswered()
    utilMethods.animateCorrect(correctEl);
    // Wait for a short delay before updating the quiz page and generating a new question
    await utilMethods.delay(150);
    updateMCQuizPage()
    if (operator) questionLogic.newQuestion("multiple-choice-quiz", operator, mcQuizCreateOptions);
    else throw new Error("Error retrieving operator from session storage")
  } else {
    // If the answer is incorrect:
    // Increment the number of failed attempts
    state.mcQuizActive.mcqFailedAttempts += 1;
    // Check if all questions are answered and show the score if true. Animate elements based on correctness
    checkMCQAnswered()
    if (falseEl) utilMethods.animateIncorrect(falseEl);
    // utilMethods.animateCorrect(correctEl);
    // Wait for a short delay before updating the quiz page and generating a new question
    await utilMethods.delay(150);
    updateMCQuizPage()
    // questionLogic.newQuestion("multiple-choice-quiz",operator, mcQuizCreateOptions);
  }
}

export function mcQuizCreateOptions(n1: number, n2: number, o1: string): void {

  // Create an array of options for the multiple choice question
  let options:number[]= utilMethods.createOptions(n1, n2, o1)

  // Clear the options element
  mcQuizOptions.innerHTML = "";

  // Calculate the answer to the question
  let ans = utilMethods.calculation(n1, n2, o1)

  // Create a button element for each option and append it to the options element
  options.forEach((option) => {
    const optionEl = document.createElement("button");
    optionEl.classList.add("option");
    optionEl.textContent = option.toString();
    let correctOption: HTMLButtonElement;

    // If the current option is the correct answer, set the correct option to the current button element
    if (option == ans) {
      correctOption = optionEl;
    }
    // Add an event listener to the button element to check if the answer is correct or incorrect
    optionEl.addEventListener("mousedown", function (e: Event) {
      let targetEl = e.target as HTMLElement;
      if (targetEl.textContent == ans.toString()) {
        // If the answer is correct, call mcQuizAnswerCheck with true as the first argument and the current button element as the second argument
        mcQuizAnswerCheck(true, targetEl);
      }
      if (targetEl.textContent != ans.toString()) {

        // If the answer is incorrect, call mcQuizAnswerCheck with false as the first argument, the button element with the correct answer as the second argument, and the current button element as the third argument
        mcQuizAnswerCheck(false, correctOption, targetEl);
      }
    });
    mcQuizOptions.appendChild(optionEl);
  });
}


///
///
window.onload = function () {

  let operator: string | null = sessionStorage.getItem("activeOperators")



  let difficulty: string | null = sessionStorage.getItem("activeDifficulty")
  if (operator && difficulty) {
    utilMethods.updateGeneralSelected(operator, difficulty)
    questionLogic.newQuestion('multiple-choice-quiz', operator, mcQuizCreateOptions);
  }

} 