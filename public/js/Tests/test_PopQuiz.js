

import * as utilMethods from '../utils.js';
import { state } from '../state.js'
import * as questionLogic from '../sharedQuestionLogic.js';
import { updateBadgeStatus } from '../badges.js';
import { animateBadge } from '../badgeEarned.js';
import { quizAmountCorrect, quizAmountCorrectPercentage, quizAnswerForm, quizAnswerInput, quizCorrectness, quizCurrQuestion, quizCurrScore, quizCurrScoreContainer, quizLastScore, quizLastScoreContainer, quizModal, quizNumOne, quizNumTwo, quizOpOne } from '../domElements.js';


  ////////////////////////////////////////////////////////////
  //QUIZ
  //
  async function quizAnswerCheck(bool) {
    if (bool) {
      // Emphasize the quizAnswerForm to indicate a correct answer
      utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);

      // Update the view to show that the answer is correct
      utilMethods.correctnessView(true, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);

      // Add the boolean value 'true' to the quizStats object to indicate a correct answer
      addToQuizProperty(bool, state.quizStats);

      // Check the quiz status, update the scores accordingly, and delay 700ms
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);

      // Re-enable the quizAnswerInput and reset the input fields
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([
        quizAnswerInput]);

      // Generate a new question for the quiz
      questionLogic.newQuestion("quiz", state.activeOperators,state);

    } else {
      // Display an animation to indicate an incorrect answer
      utilMethods.incorrectMotion(quizAnswerForm);

      // Update the view to show that the answer is incorrect
      utilMethods.correctnessView(false, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);

      // Add the boolean value 'false' to the quizStats object to indicate an incorrect answer
      addToQuizProperty(bool, state.quizStats);

      // Check the quiz status, update the scores accordingly and delay 700ms
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);

      // Re-enable the quizAnswerInput and reset the input fields
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([ quizAnswerInput]);

      // Generate a new question for the quiz
      questionLogic.newQuestion("quiz", state.activeOperators,state);
    }
  }
  async function quizShowScore() {
    // Update the quiz score information in the view
    quizAmountCorrect.textContent = state.quizStats.numCorrect;
    quizAmountCorrectPercentage.textContent = utilMethods.percentage(state.quizStats.numCorrect, state.quizStats.numAnswered).toString() + "%";

    // Display the quizModal with an animation
    quizModal.style.visibility = "visible";
    quizModal.style.zIndex = 101;
    utilMethods.emphasize(quizModal);

    // Delay for 1600ms before hiding the quizModal with an animation
    await utilMethods.delay(1600);
    quizModal.style.visibility = "hidden";
    quizModal.style.zIndex = 0;

    // Re-enable the quizAnswerInput after the quiz is over
    utilMethods.enableInput(quizAnswerInput);
  }

  function resetQuizProperty(quizStats) {
    // Reset the quiz statistics object
    quizStats.numAnswered = 0;
    quizStats.numCorrect = 0;
  }

  function updateQuizScores(score, question, quizStats) {
    // Update the scores displayed on the quiz interface
    score.innerHTML = quizStats.numCorrect;
    question.innerHTML = quizStats.numAnswered;
  }

  function addToQuizProperty(bool, quizStats) {
    // Update the quiz statistics object based on whether the answer was correct or not
    quizStats.numAnswered += 1;
    if (bool) {
      quizStats.numCorrect += 1;
    }
    // Update the scores displayed on the quiz interface
    updateQuizScores(quizCurrScore, quizCurrQuestion, quizStats);
  }

  async function checkQuizStatus(quizStats, currScoreContainerEl, lastScoreContainerEl, lastScoreEl) {
    // Check whether the quiz has been completed, and if so, finish the quiz
    if (quizStats.numAnswered == 1) {
      // If this is the first question, show the current score container element
      utilMethods.visibilityToggle(true, currScoreContainerEl);
    }
    if (quizStats.numAnswered >= quizStats.numQuestions) {
      // If this is the last question, show the quiz score modal and update the last score container element
     if(quizStats.numCorrect == 10){
     
      await updateBadgeStatus("quiz",state.activeDifficulty, true)
      await animateBadge()
     }
     else{
      quizShowScore();
     }
      await utilMethods.delay(1200);
      utilMethods.visibilityToggle(false, currScoreContainerEl);
      utilMethods.visibilityToggle(true, lastScoreContainerEl);
      finishQuiz(lastScoreEl, quizStats);
    }
  }


  async function finishQuiz(lastScoreEl, quizStats) {

    // Update the last score element and reset the quiz statistics object
    lastScoreEl.innerHTML = quizStats.numCorrect;
    resetQuizProperty(quizStats);
    utilMethods.showHide([],[ quizCorrectness]);


    // Generate a new question
    questionLogic.newQuestion("quiz", state.activeOperators,state);
  }

  //
  //END QUIZ
  ////////////////////////////////////////////////////////////

  function quizUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    state.userValue = userAnswer; // Update the state with the user's answer
  }

  function quizAnswerHandler(e) {
    let realAns = utilMethods.calculation(
      quizNumOne.innerHTML,
      quizNumTwo.innerHTML,
      quizOpOne.innerHTML
    ); // Calculate the correct answer using the quizNumOne, quizNumTwo, and quizOpOne elements
    quizAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the quizAnswerCheck function
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
  }


  quizAnswerInput.addEventListener("input", quizUpdateAnswerHandler); // Add an event listener to the quizAnswerInput element that updates the state with the user's answer
  quizAnswerForm.addEventListener("submit", quizAnswerHandler); // Add an event listener to the quizAnswerForm element that checks the user's answer

  window.onload = function(){
    let operators = utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"))
    // console.log(operators)
    // state.activeOperators = sessionStorage.getItem("activeOperators")
    state.activeOperators=operators

    // sessionStorage.setItem("activeOperators",operators)
    // sessionStorage.setItem("",operators)
    // questionLogic.newGeneralQuestion(flashOpOne,flashNumOne,flashNumTwo,state.activeOperators)
    questionLogic.newQuestion('quiz',operators,state);
  } 