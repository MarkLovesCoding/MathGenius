

import * as utilMethods from '../utils.js';
import { state } from '../state.js'
import * as questionLogic from '../sharedQuestionLogic.js';
import { updateBadgeStatus, retrieveBadges,getHighestBadge } from '../badges.js';
import { animateBadge } from '../badgeEarned.js';

import {  gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, gameActual, gameActualContainer,  gameAnswerInput, gameAnswerSubmit, gameCurrScore, gameHighScore, gameLevelNumber, gameTracker, gameTrackerContainer, gameTrackerContainer2 } from '../domElements.js';

////////////////////////////////////////////////////////////
//GAME
//
async function gameAnswerCheck(bool) {
  // If the answer is correct:
  const level = sessionStorage.getItem("activeDifficulty")
  const operator = sessionStorage.getItem("activeOperators")
  
  // TO DO remove below line update diff range
  utilMethods.updateDifficultyRange(operator)
  if (bool) {
    // Show correct answer message and update score
    utilMethods.correctnessView(true, gameCorrectness);
    utilMethods.emphasize(gameCorrectness);
    utilMethods.visibilityTimedToggle(false, gameActualContainer, 1000);
    updateScore();
    // Update level and disable input for a short period
    utilMethods.disableInput(gameAnswerInput);
    await updateLevel();
    await utilMethods.delay(300);
    utilMethods.resetAnswerInput([gameAnswerInput]);
    utilMethods.enableInput(gameAnswerInput);
    // Reset input and generate new question
    questionLogic.newQuestion("game", operator);
  }
  // If the answer is incorrect:
  else {
    // const level = sessionStorage.getItem("activeDifficulty")
    // Show incorrect answer message and reset score/tracker
    utilMethods.correctnessView(false, gameCorrectness);
    utilMethods.incorrectMotion(gameCorrectness);
    utilMethods.disableInput(gameAnswerInput);
    await utilMethods.delay(200);
    utilMethods.visibilityTimedToggle(true, gameActualContainer, 4000);
    utilMethods.resetAnswerInput([gameAnswerInput]);
    utilMethods.resetNumber(gameCurrScore,level);
    utilMethods.resetWidth([gameTracker]);
    // Generate new question and re-enable input after a short period
    questionLogic.newQuestion("game", operator);
    await utilMethods.delay(500);
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
  if(curr == 50) gameOverWin()
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
  // gameTracker2.style.backgroundColor = newColor;
}

// This function calculates the progress of the game's level and adds a level to the game tracker.
// function addlevel() {
//   // Calculates the width of the game tracker by subtracting the border width from the full width
//   let fullWidth = window.getComputedStyle(gameTrackerContainer).width;
//   let borderWidth = window.getComputedStyle(gameTrackerContainer).getPropertyValue("border-width");
//   fullWidth = parseFloat(fullWidth.slice(0, -2));
//   borderWidth = parseFloat(borderWidth.slice(0, -2));
//   fullWidth = fullWidth - borderWidth * 2;
//   // Increases the progress width of the game tracker by one-tenth of the full width
//   let progressWidth = window.getComputedStyle(gameTracker).width;
//   progressWidth = parseFloat(progressWidth.slice(0, -2));
//   progressWidth += fullWidth / 9;
//   gameTracker.style.width = progressWidth + "px";
// }

// async function  updateLevelVisuals(level){

//   const [difficultyText,difficultyColor] = utilMethods.createDifficultyText(String(level))
//   const difficulty = document.getElementById("selected-difficulty-general")
//   const difficultyContainer = document.getElementById("selected-difficulty-container-general")
//   difficultyContainer.style.border = "3px solid "+ difficultyColor

//   difficulty.textContent = difficultyText
// }
async function checkBadgeStatus(badges,operator,difficulty){
  // console.log("running Badge status check",badges[operator]['game'][difficulty] )
  const reformattedOperator = utilMethods.reformatOperator(operator)

  if(badges[reformattedOperator]["game"][difficulty] === false) return true;
  else return false;
}


async function updateLevel() {
  // Gets the current level number and checks if the user has made progress towards the next level or not
  let level = parseInt(gameLevelNumber.textContent);
  if (parseInt(gameCurrScore.textContent) % 1 == 0) {
    updateProgress(gameCurrScore.textContent);
  }

  // Checks if the user has reached the next level and adds a new level to the game tracker
  if (parseInt(gameCurrScore.textContent) % 10 == 0) {
    let currDifficulty = Number(sessionStorage.getItem("activeDifficulty"));
    const activeOperator = sessionStorage.getItem("activeOperators")
    const badgesFromDb = await retrieveBadges()

    // const activeBadges = sessionStorage.getItem("badges")
    // console.log("activeBadges",activeBadges['addition'])
    // await updateBadgeStatus("game", currDifficulty, activeOperator, true)

    let nextDifficulty = currDifficulty == 5 ? 5: currDifficulty + 1 
    await utilMethods.updateLevelVisuals(nextDifficulty)
    utilMethods.updateGeneralSelected(activeOperator,nextDifficulty)
    sessionStorage.setItem("activeDifficulty",nextDifficulty)
    utilMethods.updateDifficultyRange()
    if(await checkBadgeStatus(badgesFromDb,utilMethods.reformatOperator(activeOperator),currDifficulty)) {
      animateBadge()
      await utilMethods.delay(200);
      const badgeImgs = document.getElementsByClassName("badge-img");
      // const badgesFromDb = await retrieveBadges()
      await updateBadgeStatus('game',currDifficulty,activeOperator,true)
      const badgesFromDbUpdated = await retrieveBadges()

      updateChallengeBadgeAppearance(badgeImgs,badgesFromDbUpdated,activeOperator)
    }
    
    await utilMethods.delay(300);


    // Disables the user input and resets the width of the game tracker
    utilMethods.disableInput(gameAnswerInput);
    utilMethods.resetWidth([gameTracker]);

    // Adds a new level to the game tracker and updates the level number
    // addlevel();
    level += 1;

    // Animates the level up message and waits for 1 second before re-enabling the user input
    levelUp(level);
    // questionLogic.newQuestion('game', activeOperator);
    // await utilMethods.delay(200);
    // utilMethods.enableInput(gameAnswerInput);

  }
  // Updates the level number displayed to the user
  gameLevelNumber.textContent = level;
}


/**
 * Updates the width of the progress bar by adding a fraction of the full width to it.
 * If the progress bar is filled to its full width, it resets after a delay of 1 second.
 */
async function updateProgress(questionNumber) {
  // Get the full width of the progress bar container and subtract the border width to get the actual width
  console.log(questionNumber)
  // console.log(questionNumber%10)
  questionNumber = questionNumber > 10 ? questionNumber%10 : questionNumber
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

  progressWidth = fullWidth / 10 * questionNumber;

  gameTracker.style.width = progressWidth + "px";

  // If the progress bar is filled to its full width, reset it after a delay of 1 second
  if (progressWidth >= fullWidth) {
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
  let realAns = utilMethods.calculation(
    gameNumOne.innerHTML,
    gameNumTwo.innerHTML,
    gameOpOne.innerHTML
  ); // Calculate the correct answer using the gameNumOne, gameNumTwo, and gameOpOne elements

  gameActual.innerHTML = realAns; // Display the correct answer in the gameActual element
  gameAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the gameAnswerCheck function
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
}
function gameOverWin(){
  alert("You just beat the Challenge and got 50 questions correct! Great job! You're a Math Genius! Keep going to beat your high score!")
 }



async function resetGameSettings(){
  // utilMethods.correctnessView(false, gameCorrectness);
  // utilMethods.incorrectMotion(gameCorrectness);
  const operator = sessionStorage.getItem("activeOperators")
  const difficulty = sessionStorage.getItem("activeDifficulty")
  utilMethods.disableInput(gameAnswerInput);
  // utilMethods.visibilityTimedToggle(true, gameActualContainer, 1000);
  await utilMethods.delay(250);
  utilMethods.resetAnswerInput([gameAnswerInput]);
  utilMethods.resetNumber(gameCurrScore,1);
  utilMethods.resetLevelNumber(gameLevelNumber);
  utilMethods.resetWidth([gameTracker]);
  sessionStorage.setItem("activeDifficulty",1)
  await utilMethods.updateLevelVisuals(1)
  utilMethods.updateGeneralSelected(operator,1)
 
  utilMethods.updateDifficultyRange()
  // Generate new question and re-enable input after a short period
  questionLogic.newQuestion("game", operator);
  await utilMethods.delay(250);
  utilMethods.enableInput(gameAnswerInput);


}

const startOverButton = document.getElementById("hsc-start-over")
startOverButton.addEventListener("click", resetGameSettings)

gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler); // Add an event listener to the gameAnswerInput element that updates the state with the user's answer
gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler); // Add an event listener to the gameAnswerSubmit element that checks the user's answer and updates the gameActual element



function updateChallengeBadgeAppearance(elements, badges,operator) {
  const reformattedOperator = utilMethods.reformatOperator(operator)
  const bestBadges = getHighestBadge(badges)
  console.log("bestBadges",bestBadges)
  // for (let element of elements) {
  //   // TO DO
  //   //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
  //   // use profile objest to find highest accomplished badge?
  //   element.classList.add("active");

  //   // let operator = element.getAttribute("data-badge-operator")
  //   let type = element.getAttribute("data-badge-type");
  //   let operator = element.getAttribute("data-badge-operator");

  //   if (profile[operator][type][diff]) {
  //   } else {
  //     element.classList.remove("active");
  //   }
  // }
  for (let best of bestBadges) {
    if (best[2] !== 0 && best[0]==reformattedOperator && best[1]=='game') {
      const highestLevel = best[2];
      for(let element of elements){

    
        // TO DO
        //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
        // use profile objest to find highest accomplished badge?


        // let operator = element.getAttribute("data-badge-operator")
        let type = element.getAttribute("data-badge-type");
        let difficulty = element.getAttribute("data-badge-number");
        if(difficulty <= highestLevel){
          element.classList.add("active")

        }
        // console.log("badgeop",operator)
        
        
      }

      
    }
  }
}





window.onload = async function () {
  let operator = sessionStorage.getItem("activeOperators")
  // state.activeOperators = sessionStorage.getItem("activeOperators")


  let difficulty = sessionStorage.getItem("activeDifficulty")
  // console.log(difficulty)
  // utilMethods.updateDifficultyRange(operator)
  // console.log(operator)
  const badgeImgs = document.getElementsByClassName("badge-img");
  const badgesFromDb = await retrieveBadges()


  updateChallengeBadgeAppearance(badgeImgs,badgesFromDb,operator)
  
  // sessionStorage.setItem("activeOperators",operators)
  // sessionStorage.setItem("",operators)
  utilMethods.resetNumber(gameCurrScore,difficulty);

  
  // sessionStorage.setItem("badges",badgesFromDb)
  

  resetGameSettings()

  // questionLogic.newQuestion('game', operator);
} 


