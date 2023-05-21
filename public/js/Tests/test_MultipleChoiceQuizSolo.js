

import * as utilMethods from '../ulils.js';
import { state } from '../state.js'
import * as questionLogic from '../sharedQuestionLogic.js';
import { updateBadgeStatus } from '../badges.js';
import { animateBadge } from '../badgeEarned.js';
import {  mcQuizOptions  } from '../domElements.js';




  //////MCQUIZ

  /**
   * resets the relevant state values.
   */
  function finishMCQuiz() {
    // add state db flow

    // Reset state values
    state.mcQuizActive.mcqNumAnswered = 0;
    state.mcQuizActive.mcqNumCorrect = 0;
    state.mcQuizActive.mcqFailedAttempts = 0;
  }




  const mcQuestionNumber = document.getElementById("mc-question-number")
  const mcQuestionsCorrect = document.getElementById("mc-questions-correct")
  const mcQuizModal = document.getElementById("mc-quiz-modal")
  const mcQuizAmountCorrect = document.getElementById("mc-quiz-amountCorrect");
  const mcQuizAmountCorrectPercentage = document.getElementById("mc-quiz-amountCorrectPercentage");




  async function mcQuizShowScore() {
    // Update text content of elements with score information
    mcQuizAmountCorrect.textContent = state.mcQuizActive.mcqNumCorrect;
    mcQuizAmountCorrectPercentage.textContent = utilMethods.percentage(state.mcQuizActive.mcqNumCorrect, state.mcQuizActive.mcqNumAnswered).toString() + "%";
    // Show quiz modal and add emphasis effect
    mcQuizModal.style.visibility = "visible";
    mcQuizModal.style.zIndex = 101;
    utilMethods.emphasize(mcQuizModal);
    // Wait for a delay, then hide quiz modal and remove emphasis effect
    await utilMethods.delay(1600);
    mcQuizModal.style.visibility = "hidden";
    mcQuizModal.style.zIndex = 0;
  }

  function updateMCQuizPage() {
    // Update text content of elements with question and score information
    const numCorrect = state.mcQuizActive.mcqNumCorrect;
    const numQuestion = state.mcQuizActive.mcqNumQuestion;
    const numAnswered = state.mcQuizActive.mcqNumAnswered;
    mcQuestionNumber.textContent = numAnswered;
    mcQuestionsCorrect.textContent = numCorrect;
  }

  async function checkMCQAnswered() {
    // If all questions have been answered, show score and finish quiz
    if (state.mcQuizActive.mcqNumAnswered == state.mcQuizActive.mcqNumQuestion) {
    
      if(state.mcQuizActive.mcqNumCorrect == 10){
        await updateBadgeStatus("mcquiz",state.activeDifficulty, true)
        await animateBadge()
      }
      else{
      mcQuizShowScore()

      }
      finishMCQuiz()
    }
  }

 


  async function mcQuizAnswerCheck(bool, correctEl, falseEl = null) {
    // Check if the answer is correct or not
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
      questionLogic.newQuestion("multiple-choice-quiz", state.activeOperators, mcQuizCreateOptions);
    } else {
      // If the answer is incorrect:
      // Increment the number of failed attempts
      state.mcQuizActive.mcqFailedAttempts += 1;
      // Check if all questions are answered and show the score if true. Animate elements based on correctness
      checkMCQAnswered()
      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      // Wait for a short delay before updating the quiz page and generating a new question
      await utilMethods.delay(150);
      updateMCQuizPage()
      questionLogic.newQuestion("multiple-choice-quiz", state.activeOperators, mcQuizCreateOptions);
    }
  }

 export function mcQuizCreateOptions(n1, n2, o1) {

    // Create an array of options for the multiple choice question
    let options = utilMethods.createOptions(n1, n2, o1)

    // Clear the options element
    mcQuizOptions.innerHTML = "";

    // Calculate the answer to the question
    let ans = utilMethods.calculation(n1, n2, o1)

    // Create a button element for each option and append it to the options element
    options.forEach((option, index) => {
      const optionEl = document.createElement("button");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      let correctOption;

      // If the current option is the correct answer, set the correct option to the current button element
      if (option == ans) {
        correctOption = optionEl;
      }
      // Add an event listener to the button element to check if the answer is correct or incorrect
      optionEl.addEventListener("mousedown", function (e) {
        let targetEl = e.target;
        if (targetEl.textContent == ans) {
          // If the answer is correct, call mcQuizAnswerCheck with true as the first argument and the current button element as the second argument
          mcQuizAnswerCheck(true, targetEl);
        }
        if (targetEl.textContent != ans) {
          // If the answer is incorrect, call mcQuizAnswerCheck with false as the first argument, the button element with the correct answer as the second argument, and the current button element as the third argument
          mcQuizAnswerCheck(false, correctOption, targetEl);
        }
      });
      mcQuizOptions.appendChild(optionEl);
    });
  }


  ///
  ///
  window.onload = function(){
    console.log("Get:",sessionStorage.getItem("activeOperators"))
    let operators = utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"))
    state.activeOperators=operators
    sessionStorage.setItem("activeOperators",operators)
    // sessionStorage.setItem("",operators)
    // questionLogic.newGeneralQuestion(flashOpOne,flashNumOne,flashNumTwo,state.activeOperators)
    questionLogic.newQuestion('multiple-choice-quiz',operators,mcQuizCreateOptions);
  } 