

import * as utilMethods from './ulils.js';


import {  mcQuizOptions,  } from './domElements.js';
import { quizAmountCorrect, quizAmountCorrectPercentage, quizAnswerForm, quizAnswerInput, quizCorrectness, quizCurrQuestion, quizCurrScore, quizCurrScoreContainer, quizLastScore, quizLastScoreContainer, quizModal, quizNumOne, quizNumTwo, quizOpOne } from './domElements.js';
import { gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, gameActual, gameActualContainer, gameAnswerInput, gameAnswerSubmit, gameCurrScore, gameHighScore, gameLevelNumber, gameTracker, gameTracker2, gameTrackerContainer, gameTrackerContainer2 } from './domElements.js';
import { state } from './state.js'
import { updateBadgeStatus } from './badges.js';
import { animateBadge } from './badgeEarned.js';
import * as questionLogic from './sharedQuestionLogic.js';

window.onload = function () {  //Ensure DOM is loaded before functions



  // Function to update the difficulty range based on the current active difficulty level
  function updateDifficultyRange() {
    let i = state.activeDifficulty, highVal, lowVal;

    // Set the high and low values based on the current active difficulty level
    switch (i) {
      case 1:
        highVal = 5;
        lowVal = 0;
        break;
      case 2:
        highVal = 6;
        lowVal = 1;
        break;
      case 3:
        highVal = 8;
        lowVal = 2;
        break;
      case 4:
        highVal = 10;
        lowVal = 3;
        break;
      case 5:
        highVal = 12;
        lowVal = 3;
        break;
    }

    // Set the active multiply low and high values based on the low and high values set above
    state.activeMultiplyLowVal = lowVal;
    state.activeMultiplyHighVal = highVal;

    // Set the active high value based on the current active difficulty level
    state.activeHighVal = (i) * 10;
  }

  // Function to show the main menu
  // function showMainMenu() {
  //   utilMethods.loadSection("activity-menu"); // Load the activity menu section
  //   // hideBurger(); // Hide the burger menu
  //   resetQuizProperty(state.quizStats); // Reset the quiz stats
  //   utilMethods.resetNumberToZero(gameLevelNumber); // Reset the game level number
  //   utilMethods.resetWidth([gameTracker, gameTracker2]); // Reset the width of game trackers
  // }

  //
  //
  //END SHARED
  ////////////////////////////////////////////////////////////














  ////////////////////////////////////////////////////////////
  //GAME
  //
  async function gameAnswerCheck(bool) {
    // If the answer is correct:
    if (bool) {
      // Show correct answer message and update score
      correctnessView(true, gameCorrectness);
      utilMethods.emphasize(gameCorrectness);
      utilMethods.visibilityTimedToggle(false, gameActualContainer, 1000);
      updateScore();
      // Update level and disable input for a short period
      await updateLevel();
      utilMethods.disableInput(gameAnswerInput);
      await utilMethods.delay(700);
      utilMethods.enableInput(gameAnswerInput);
      // Reset input and generate new question
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);
      questionLogic.newQuestion("game", state.activeOperators);
    }
    // If the answer is incorrect:
    else {
      // Show incorrect answer message and reset score/tracker
      // utilMethods.showHide([], [burgerContainer]);
      correctnessView(false, gameCorrectness);
      utilMethods.incorrectMotion(gameCorrectness);
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.visibilityTimedToggle(true, gameActualContainer, 1000);
      await utilMethods.delay(700);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);
      utilMethods.resetNumberToZero(gameCurrScore);
      utilMethods.resetWidth([gameTracker]);
      // Generate new question and re-enable input after a short period
      questionLogic.newQuestion("game", state.activeOperators);
      await utilMethods.delay(1500);
      utilMethods.enableInput(gameAnswerInput);
    }
  }

  /**
   * Compares the current game score to the current high score and updates the display
   * if necessary.
   */
  function updateScore() {
    let currScoreInner = parseInt(gameCurrScore.innerHTML);
    currScoreInner += 1;
    gameCurrScore.innerHTML = currScoreInner;
    checkHighScore();
  }


  /**
 * Compares the current game score to the current high score and updates the display
 * if necessary.
 */
  function checkHighScore() {
    let curr = gameCurrScore.innerHTML;
    if (curr > parseInt(state.high_score)) {
      state.high_score = curr;
      gameHighScore.innerHTML = curr;
    } else {
      gameHighScore.innerHTML = state.high_score;
    }
  }



  /**
 * Displays the correctness of the user's answer by toggling the visibility of the given element and
 * updating its styling and text content based on whether the answer was correct or incorrect.
 * @param {boolean} bool - Whether the user's answer was correct.
 * @param {HTMLElement} element - The element to display the correctness on.
 */
  function correctnessView(bool, element) {
    utilMethods.showHide([element], []);
    if (bool) {
      element.classList.add("correct-answer");
      element.classList.remove("incorrect-answer");
      element.textContent = "Correct";
    } else {
      element.classList.remove("correct-answer");
      element.classList.add("incorrect-answer");
      element.textContent = "Incorrect";
    }
  }

  /**
   * Updates the styling of the game tracker elements to match the given game level.
   * @param {number} level - The current game level.
   */
  function levelUp(level) {
    let newColor = `hsl( ${level * 30}, 100%, 50%)`;
    gameTracker.style.backgroundColor = newColor;
    gameTracker2.style.backgroundColor = newColor;
  }

  // This function calculates the progress of the game's level and adds a level to the game tracker.
  function addlevel() {
    // Calculates the width of the game tracker by subtracting the border width from the full width
    let fullWidth = window.getComputedStyle(gameTrackerContainer2).width;
    let borderWidth = window.getComputedStyle(gameTrackerContainer2).getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    // Increases the progress width of the game tracker by one-tenth of the full width
    let progressWidth = window.getComputedStyle(gameTracker2).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    gameTracker2.style.width = progressWidth + "px";
  }

  // This function updates the game level based on the user's score and increases the difficulty of the game as the level progresses.
  
  async function updateLevel() {
    // Gets the current level number and checks if the user has made progress towards the next level or not
    let level = parseInt(gameLevelNumber.textContent);
    if (parseInt(gameCurrScore.textContent) % 1 == 0) {
      updateProgress();
    }
  
    // Checks if the user has reached the next level and adds a new level to the game tracker
    if (parseInt(gameCurrScore.textContent) % 10 == 0) {

        await updateBadgeStatus("game",state.activeDifficulty, true)
      await animateBadge()
      // Disables the user input and resets the width of the game tracker
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.resetWidth([gameTracker]);
  
      // Adds a new level to the game tracker and updates the level number
      addlevel();
      level += 1;
  
      // Animates the level up message and waits for 1 second before re-enabling the user input
      levelUp(level);
      await utilMethods.delay(1000);
      utilMethods.enableInput(gameAnswerInput);
    }
    // Updates the level number displayed to the user
    gameLevelNumber.textContent = level;
  }
  

  /**
   * Updates the width of the progress bar by adding a fraction of the full width to it.
   * If the progress bar is filled to its full width, it resets after a delay of 1 second.
   */
  async function updateProgress() {
    // Get the full width of the progress bar container and subtract the border width to get the actual width
    let fullWidth = window.getComputedStyle(gameTrackerContainer).width;
    let borderWidth = window
      .getComputedStyle(gameTrackerContainer)
      .getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;

    // Get the current width of the progress bar and add a fraction of the full width to it
    let progressWidth = window.getComputedStyle(gameTracker).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    gameTracker.style.width = progressWidth + "px";

    // If the progress bar is filled to its full width, reset it after a delay of 1 second
    if (progressWidth == fullWidth) {
      await utilMethods.delay(1000);
      utilMethods.resetWidth([gameTracker]);
    }
  }



  //
  //END GAME
  ////////////////////////////////////////////////////////////






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

  function mcQuizCreateOptions(n1, n2, o1) {

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




  ////////////////////////////////////////////////////////////
  //QUIZ
  //
  async function quizAnswerCheck(bool) {
    if (bool) {
      // Emphasize the quizAnswerForm to indicate a correct answer
      utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);

      // Update the view to show that the answer is correct
      correctnessView(true, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);

      // Add the boolean value 'true' to the quizStats object to indicate a correct answer
      addToQuizProperty(bool, state.quizStats);

      // Check the quiz status, update the scores accordingly, and delay 700ms
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);

      // Re-enable the quizAnswerInput and reset the input fields
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);

      // Generate a new question for the quiz
      questionLogic.newQuestion("quiz", state.activeOperators);

    } else {
      // Display an animation to indicate an incorrect answer
      utilMethods.incorrectMotion(quizAnswerForm);

      // Update the view to show that the answer is incorrect
      correctnessView(false, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);

      // Add the boolean value 'false' to the quizStats object to indicate an incorrect answer
      addToQuizProperty(bool, state.quizStats);

      // Check the quiz status, update the scores accordingly and delay 700ms
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);

      // Re-enable the quizAnswerInput and reset the input fields
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);

      // Generate a new question for the quiz
      questionLogic.newQuestion("quiz", state.activeOperators);
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

    // Generate a new question
    questionLogic.newQuestion("quiz", state.activeOperators);
  }

  //
  //END QUIZ
  ////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////////////////
  //EVENT HANDLERS
  //

  // Adds an event listener to the gameAnswerInput element to update the user value when the input changes
  function gameUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    state.userValue = userAnswer;
  }

  // Adds an event listener to the gameAnswerSubmit element to check the user's answer when the form is submitted
  function gameCheckAnswerHandler(e) {
    let realAns = utilMethods.calculation(
      gameNumOne.innerHTML,
      gameNumTwo.innerHTML,
      gameOpOne.innerHTML
    ); // Calculate the correct answer using the gameNumOne, gameNumTwo, and gameOpOne elements

    gameActual.innerHTML = realAns; // Display the correct answer in the gameActual element
    gameAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the gameAnswerCheck function
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
  }
  gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler); // Add an event listener to the gameAnswerInput element that updates the state with the user's answer
  gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler); // Add an event listener to the gameAnswerSubmit element that checks the user's answer and updates the gameActual element

  // Adds an event listener to the quizAnswerInput element to update the user value when the input changes

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


  const operatorMenuForward = document.getElementById("operator-menu-forward")

  const operatorTestMenuBackwarUpper = document.getElementById("operator-test-menu-backward-upper")
  const operatorTestMenuBackwardLower = document.getElementById("operator-test-menu-backward-lower")
  
  const difficultyMenuForward = document.getElementById("difficulty-menu-forward")
  const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper")
  const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower")

  const operatorTestMenuBackwards = [operatorTestMenuBackwarUpper, operatorTestMenuBackwardLower];
  const difficultyMenuBackwards = [difficultyMenuBackwardUpper, difficultyMenuBackwardLower]
  // const practiceMenuBackwards = [practiceMenuBackwardUpper, practiceMenuBackwardLower]

  const activitiesChoices = document.querySelectorAll(".activity-choice")
  const realChoices = document.querySelectorAll(".real-choice")
  // const practiceChoices = document.querySelectorAll(".practice-choice")


  const operatorAlert = document.getElementById("operator-alert-modal")




  // Handle the click event on the operatorMenuForward button
  operatorMenuForward.addEventListener("click", (e) => {

    // Update the active operators based on the user's selection
    state.activeOperators = updateOperators(operatorChoices)

    // Show an error message if no operators are selected, and prevent the page from reloading
    if (state.activeOperators.length == 0) {
      utilMethods.visibilityTimedToggle(true, operatorAlert, 1100)
      return;
    }

    // Load the difficulty-menu section
    utilMethods.loadSection("difficulty-menu")
  })


  for (let el of operatorTestMenuBackwards) {
    el.addEventListener("click", (e) => {
      utilMethods.loadSection("real-menu")
    })
  }








  // Handle the click event on the difficultyMenuBackwards button
  for (let el of difficultyMenuBackwards) {
    el.addEventListener("click", (e) => {
      utilMethods.loadSection("operator-menu")
    })
  }

  // Handle the click event on the difficultyMenuForward button
  difficultyMenuForward.addEventListener("click", (e) => {

    // Update the difficulty range based on the user's selection
    updateDifficultyRange()

    // Generate a new question based on the chosen activity and active operators
    // if (state.activity === "multiple-choice") {
    //   newQuestion(state.activity, state.activeOperators, mcCreateOptions)
    // }
    // else 
    if (state.activity === "multiple-choice-quiz") {
      questionLogic.newQuestion(state.activity, state.activeOperators, mcQuizCreateOptions)
    }
    else {
      questionLogic.newQuestion(state.activity, state.activeOperators)
    }
  })


  // A function to add event listeners for activity types (real/practice)
  function addEventsForTypes(activitiesChoices, state) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", (e) => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
        // Remove the "activity-selected" class from all activity options
        let type;
        if (e.target.getAttribute("data-type")) {
          type = e.target.getAttribute("data-type")
        }
        else {
          type = e.target.parentNode.getAttribute("data-type")
        }
        // Determine which activity type was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected")
        // Add the "activity-selected" class to the selected activity option
        state.type = type
        // Set the state's "type" property to the selected activity type
      })
    }
  }

  // A function to add event listeners for specific activities (e.g., real addition, practice multiplication)
  function addEventsForActivities(activitiesChoices, state) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", (e) => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
        // Remove the "activity-selected" class from all activity options
        let type;
        if (e.target.getAttribute("data-type")) {
          type = e.target.getAttribute("data-type")
        }
        else {
          type = e.target.parentNode.getAttribute("data-type")
        }
        // Determine which activity was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected")

        // Add the "activity-selected" class to the selected activity option
        state.type = type

        // Set the state's "type" property to the selected activity
      })
    }
  }

  // A function to toggle the "active-operator" class when an operator is clicked
  function toggleOperators(e) {
    e.target.classList.toggle("active-operator");
  }


  const operatorChoices = document.querySelectorAll(".operator-choice")



  // A function to add event listeners for operators (+, -, x, ÷)
  function addEventsForOperators(operatorsChoices) {
    for (let operator of operatorsChoices) {
      operator.addEventListener("click", toggleOperators)
    }
  }
  addEventsForTypes(activitiesChoices, state)
  addEventsForOperators(operatorChoices, state)
  addEventsForActivities(realChoices, state)
  // addEventsForActivities(practiceChoices, state)

  // A function to determine which activity was selected by the user
  function updateActivity(activitiesChoices, numChoices) {
    let userSelection;
    for (let i = 0; i < numChoices; i++) {
      if (activitiesChoices[i].classList.contains("activity-selected")) {
        userSelection = activitiesChoices[i].getAttribute("data-type")
      }
    }
    return userSelection;
  }

  function updateOperators(operatorChoices) {
    let ops = [];
    let amount = 0;
    for (let i = 0; i < 4; i++) {
      if (operatorChoices[i].classList.contains("active-operator")) {

        // Assign the operator symbol based on the id attribute of the selected operator element
        let operatorText;
        switch (operatorChoices[i].getAttribute("id")) {
          case "add":
            operatorText = "+";
            break;
          case "sub":
            operatorText = "-";
            break;
          case "mul":
            operatorText = "x";
            break;
          case "div":
            operatorText = "÷";
            break;
          default:
            operatorText = "+";
            break;
        }

        // Add the operator symbol to the array of active operators and to the ops array
        state.activeOperators.push(operatorText);
        ops.push(operatorText);
        amount++;
      }
    }

    // Return the array of active operators
    return ops;
  }










  // Initialize variables for the range input, range value, and level text elements
  var rangeInput = document.getElementById("range-input");
  var rangeValue = document.getElementById("range-value");
  var levelText = document.getElementById("level-text");

  // Add an event listener for when the range input is changed
  rangeInput.addEventListener("input", () => {
    // Get the selected difficulty level from the range input value
    let selectedDifficulty = parseInt(rangeInput.value);

    // Update the active difficulty level in the state object and update the range value text
    state.activeDifficulty = selectedDifficulty
    rangeValue.textContent = selectedDifficulty;

    // Set the color of the range input thumb based on the selected difficulty level
    var sliderColor = state.difficultyLevels[selectedDifficulty].color;
    rangeInput.style.setProperty('--thumb-color', sliderColor)

    // Update the level text with the name of the selected difficulty level
    levelText.textContent = state.difficultyLevels[selectedDifficulty].name;
  });



} //close window.onload function
