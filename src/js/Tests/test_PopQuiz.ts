import * as utilMethods from "../utils.js";
import { state } from "../state.js";
import * as questionLogic from "../sharedQuestionLogic.js";
import { updateBadgeStatus } from "../badges.js";
import { animateBadge } from "../badgeEarned.js";

import type { QuizStats, Operator, Difficulty } from "../types.js";

const quizAnswerForm = <HTMLFormElement>(
  document.getElementById("quiz-answer-form")
);

const quizNumOne = <HTMLElement>document.getElementById("quiz-first-number");
const quizNumTwo = <HTMLElement>document.getElementById("quiz-second-number");
const quizOpOne = <HTMLElement>document.getElementById("quiz-first-operator");
const quizAnswerInput = <HTMLInputElement>(
  document.getElementById("quiz-answer-input")
);
const quizCorrectness = <HTMLElement>(
  document.getElementById("quiz-correctness")
);
const quizAmountCorrect = <HTMLElement>document.getElementById("amountCorrect");
const quizAmountCorrectPercentage = <HTMLElement>(
  document.getElementById("amountCorrectPercentage")
);
const quizCurrScore = <HTMLElement>document.getElementById("quiz-curr-score");
const quizCurrQuestion = <HTMLElement>(
  document.getElementById("quiz-curr-question")
);
const quizCurrScoreContainer = <HTMLDivElement>(
  document.querySelector(".quiz-curr-score-container")
);
const quizLastScoreContainer = <HTMLDivElement>(
  document.querySelector(".quiz-last-score-container")
);
const quizLastScore = <HTMLElement>document.getElementById("quiz-last-score");
const quizModal = <HTMLElement>document.getElementById("quiz-modal");

// const { numOne: quizNumOne, numTwo: quizNumTwo, opOne: quizOpOne } = quizElements;

////////////////////////////////////////////////////////////
//QUIZ
//

async function quizAnswerCheck(bool: boolean): Promise<void> {
  let operator = <Operator>sessionStorage.getItem("activeOperators");
  if (bool) {
    // Emphasize the quizAnswerForm to indicate a correct answer
    utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);

    // Update the view to show that the answer is correct
    utilMethods.correctnessView(true, quizCorrectness);
    utilMethods.disableInput(quizAnswerInput);

    // Add the boolean value 'true' to the quizStats object to indicate a correct answer
    addToQuizProperty(bool, state.quizStats);

    // Check the quiz status, update the scores accordingly, and delay 700ms

    checkQuizStatus(
      state.quizStats,
      quizCurrScoreContainer,
      quizLastScoreContainer,
      quizLastScore
    );
    await utilMethods.delay(700);

    // Re-enable the quizAnswerInput and reset the input fields

    utilMethods.enableInput(quizAnswerInput);
    utilMethods.resetAnswerInput([quizAnswerInput]);

    // Generate a new question for the quiz
    if (operator) {
      questionLogic.newQuestion("quiz", operator);
    } else console.log("operator value not retrieved from sessionStorage");
  } else {
    // Display an animation to indicate an incorrect answer
    utilMethods.incorrectMotion(quizAnswerForm);

    // Update the view to show that the answer is incorrect
    utilMethods.correctnessView(false, quizCorrectness);
    utilMethods.disableInput(quizAnswerInput);

    // Add the boolean value 'false' to the quizStats object to indicate an incorrect answer
    addToQuizProperty(bool, state.quizStats);

    // Check the quiz status, update the scores accordingly and delay 700ms
    // Check the quiz status, update the scores accordingly, and delay 700ms

    checkQuizStatus(
      state.quizStats,
      quizCurrScoreContainer,
      quizLastScoreContainer,
      quizLastScore
    );
    await utilMethods.delay(700);

    // Re-enable the quizAnswerInput and reset the input fields

    utilMethods.enableInput(quizAnswerInput);
    utilMethods.resetAnswerInput([quizAnswerInput]);

    // Generate a new question for the quiz
    if (operator) {
      questionLogic.newQuestion("quiz", operator);
    } else console.log("operator value not retrieved from sessionStorage");
  }
}
async function quizShowScore(): Promise<void> {
  // Update the quiz score information in the view
  if (
    quizAmountCorrect &&
    quizAmountCorrectPercentage &&
    quizModal &&
    quizAnswerInput
  ) {
    quizAmountCorrect.textContent = state.quizStats.numCorrect.toString();
    quizAmountCorrectPercentage.textContent =
      utilMethods
        .percentage(state.quizStats.numCorrect, state.quizStats.numAnswered)
        .toString() + "%";

    // Display the quizModal with an animation
    quizModal.style.visibility = "visible";
    quizModal.style.zIndex = "101";
    utilMethods.emphasize(quizModal);

    // Delay for 1600ms before hiding the quizModal with an animation
    await utilMethods.delay(1600);
    quizModal.style.visibility = "hidden";
    quizModal.style.zIndex = "0";

    // Re-enable the quizAnswerInput after the quiz is over
    utilMethods.enableInput(quizAnswerInput);
  }
}

function resetQuizProperty(quizStats: QuizStats) {
  // Reset the quiz statistics object
  quizStats.numAnswered = 0;
  quizStats.numCorrect = 0;
}

function updateQuizScores(
  score: HTMLElement,
  question: HTMLElement,
  quizStats: QuizStats
) {
  // Update the scores displayed on the quiz interface
  score.innerHTML = quizStats.numCorrect.toString();
  question.innerHTML = quizStats.numAnswered.toString();
}

function addToQuizProperty(bool: boolean, quizStats: QuizStats) {
  // Update the quiz statistics object based on whether the answer was correct or not
  quizStats.numAnswered += 1;
  if (bool) {
    quizStats.numCorrect += 1;
  }
  // Update the scores displayed on the quiz interface

  updateQuizScores(quizCurrScore, quizCurrQuestion, quizStats);
}

async function checkQuizStatus(
  quizStats: QuizStats,
  currScoreContainerEl: HTMLDivElement,
  lastScoreContainerEl: HTMLDivElement,
  lastScoreEl: HTMLElement
) {
  // Check whether the quiz has been completed, and if so, finish the quiz
  if (quizStats.numAnswered == 1) {
    // If this is the first question, show the current score container element
    utilMethods.visibilityToggle(true, currScoreContainerEl);
  }
  if (quizStats.numAnswered >= quizStats.numQuestions) {
    // If this is the last question, show the quiz score modal and update the last score container element
    if (quizStats.numCorrect == 10) {
      const activeDifficulty = sessionStorage.getItem("activeDifficulty");
      const activeOperator = <Operator>(
        sessionStorage.getItem("activeOperators")
      );

      await animateBadge();
      if (activeDifficulty && activeOperator)
        await updateBadgeStatus("quiz", activeDifficulty, activeOperator, true);
      else {
        throw new Error(
          "Session storage operator and difficulty not retrieved"
        );
      }
    } else {
      quizShowScore();
    }
    await utilMethods.delay(1200);
    utilMethods.visibilityToggle(false, currScoreContainerEl);
    utilMethods.visibilityToggle(true, lastScoreContainerEl);
    finishQuiz(lastScoreEl, quizStats);
  }
}

async function finishQuiz(lastScoreEl: HTMLElement, quizStats: QuizStats) {
  // Update the last score element and reset the quiz statistics object
  lastScoreEl.innerHTML = quizStats.numCorrect.toString();
  resetQuizProperty(quizStats);
  utilMethods.showHide([], [quizCorrectness]);

  let operator = <Operator>sessionStorage.getItem("activeOperators");
  // Generate a new question
  if (operator) {
    questionLogic.newQuestion("quiz", operator);
  } else {
    throw new Error("Session storage operator not retrieved");
  }
}

//
//END QUIZ
////////////////////////////////////////////////////////////

function quizUpdateAnswerHandler(e: Event): void {
  if (e.target instanceof HTMLInputElement) {
    let userAnswer: number = parseInt(e.target.value, 10);
    state.userValue = userAnswer;
    // Update the state with the user's answer
  }
}

function quizAnswerHandler(e: Event): void {
  // if (quizNumOne && quizNumTwo && quizOpOne) {
  let realAns = utilMethods.calculation(
    parseInt(quizNumOne.innerHTML),
    parseInt(quizNumTwo.innerHTML),
    quizOpOne.innerHTML as Operator
  ); // Calculate the correct answer using the quizNumOne, quizNumTwo, and quizOpOne elements

  quizAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the quizAnswerCheck function
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
}

if (quizAnswerInput)
  quizAnswerInput.addEventListener("input", quizUpdateAnswerHandler); // Add an event listener to the quizAnswerInput element that updates the state with the user's answer
if (quizAnswerForm)
  quizAnswerForm.addEventListener("submit", quizAnswerHandler); // Add an event listener to the quizAnswerForm element that checks the user's answer

window.onload = function () {
  let operator = <Operator>sessionStorage.getItem("activeOperators");
  let difficulty = <Difficulty>sessionStorage.getItem("activeDifficulty");
  if (operator && difficulty) {
    utilMethods.updateGeneralSelected(operator, difficulty);
    questionLogic.newQuestion("quiz", operator);
  } else {
    throw new Error("Session storage not retrieved");
  }
};
