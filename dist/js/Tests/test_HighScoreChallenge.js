import * as utilMethods from '../ulils.js';
import { state } from '../state.js';
import * as questionLogic from '../sharedQuestionLogic.js';
import { updateBadgeStatus } from '../badges.js';
import { animateBadge } from '../badgeEarned.js';
import { gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, gameActual, gameActualContainer, gameAnswerInput, gameAnswerSubmit, gameCurrScore, gameHighScore, gameLevelNumber, gameTracker, gameTracker2, gameTrackerContainer, gameTrackerContainer2 } from '../domElements.js';

////////////////////////////////////////////////////////////
//GAME
//
async function gameAnswerCheck(bool) {
  // If the answer is correct:
  if (bool) {
    // Show correct answer message and update score
    utilMethods.correctnessView(true, gameCorrectness);
    utilMethods.emphasize(gameCorrectness);
    utilMethods.visibilityTimedToggle(false, gameActualContainer, 1000);
    updateScore();
    // Update level and disable input for a short period
    await updateLevel();
    utilMethods.disableInput(gameAnswerInput);
    await utilMethods.delay(700);
    utilMethods.enableInput(gameAnswerInput);
    // Reset input and generate new question
    utilMethods.resetAnswerInput([gameAnswerInput]);
    questionLogic.newQuestion("game", state.activeOperators);
  }
  // If the answer is incorrect:
  else {
    // Show incorrect answer message and reset score/tracker
    // utilMethods.showHide([], [burgerContainer]);
    utilMethods.correctnessView(false, gameCorrectness);
    utilMethods.incorrectMotion(gameCorrectness);
    utilMethods.disableInput(gameAnswerInput);
    utilMethods.visibilityTimedToggle(true, gameActualContainer, 1000);
    await utilMethods.delay(700);
    utilMethods.resetAnswerInput([gameAnswerInput]);
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
    await updateBadgeStatus("game", state.activeDifficulty, true);
    await animateBadge();
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
  let borderWidth = window.getComputedStyle(gameTrackerContainer).getPropertyValue("border-width");
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

// Adds an event listener to the gameAnswerInput element to update the user value when the input changes
function gameUpdateAnswerHandler(e) {
  let userAnswer = e.target.value;
  state.userValue = userAnswer;
}

// Adds an event listener to the gameAnswerSubmit element to check the user's answer when the form is submitted
function gameCheckAnswerHandler(e) {
  let realAns = utilMethods.calculation(gameNumOne.innerHTML, gameNumTwo.innerHTML, gameOpOne.innerHTML); // Calculate the correct answer using the gameNumOne, gameNumTwo, and gameOpOne elements

  gameActual.innerHTML = realAns; // Display the correct answer in the gameActual element
  gameAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the gameAnswerCheck function
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
}

gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler); // Add an event listener to the gameAnswerInput element that updates the state with the user's answer
gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler); // Add an event listener to the gameAnswerSubmit element that checks the user's answer and updates the gameActual element