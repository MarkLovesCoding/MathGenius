import * as utilMethods from "../utils.js";
import { state } from "../state.js";
import * as questionLogic from "../sharedQuestionLogic.js";
import {
  updateBadgeStatus,
  retrieveBadges,
  getHighestBadge,
} from "../badges.js";
import { animateBadge } from "../badgeEarned.js";

import { Badges, Operator, OperatorVerbose, Difficulty } from "../types.js";

const gameNumOne = <HTMLElement>document.getElementById("game-first-number");
const gameNumTwo = <HTMLElement>document.getElementById("game-second-number");
const gameOpOne = <HTMLElement>document.getElementById("game-first-operator");
const gameAnswerInput = <HTMLInputElement>(
  document.getElementById("game-answer-input")
);
const gameAnswerSubmit = <HTMLElement>(
  document.getElementById("game-answer-form")
);
const gameCorrectness = <HTMLElement>(
  document.getElementById("game-correctness")
);
const gameActual = <HTMLElement>document.getElementById("game-actual");
const gameActualContainer = <HTMLDivElement>(
  document.getElementById("game-actual-container")
);
const gameCurrScore = <HTMLElement>(
  document.getElementById("game-current-score")
);
const gameHighScore = <HTMLElement>document.getElementById("game-current-high");
const gameLevelNumber = <HTMLDivElement>(
  document.getElementById("game-level-number")
);
const gameTracker = <HTMLDivElement>document.getElementById("game-tracker");
const gameTrackerContainer = <HTMLElement>(
  document.getElementById("game-tracker-container")
);

////////////////////////////////////////////////////////////
//GAME
//
async function gameAnswerCheck(bool: boolean): Promise<void> {
  // If the answer is correct:
  const level = <string>sessionStorage.getItem("activeDifficulty");
  const operator = <Operator>sessionStorage.getItem("activeOperators");

  // TO DO remove below line update diff range
  utilMethods.updateDifficultyRange();
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
    if (operator) questionLogic.newQuestion("game", operator);
    else throw new Error("Error retrieving session storage Data");
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
    if (operator && level) {
      utilMethods.resetNumber(gameCurrScore, Number(level));
      utilMethods.resetWidth([gameTracker]);
      // Generate new question and re-enable input after a short period
      questionLogic.newQuestion("game", operator);
    } else throw new Error("Error retrieving session storage Data");

    await utilMethods.delay(500);
    utilMethods.enableInput(gameAnswerInput);
  }
}

/**
 * Compares the current game score to the current high score and updates the display
 * if necessary.
 */
function updateScore(): void {
  let currScoreInner = parseInt(gameCurrScore?.innerHTML);
  currScoreInner += 1;
  gameCurrScore.innerHTML = currScoreInner?.toString();
  checkHighScore();
}

/**
 * Compares the current game score to the current high score and updates the display
 * if necessary.
 */
function checkHighScore(): void {
  let curr = Number(gameCurrScore?.innerHTML);
  let highScore = parseInt(state.high_score.toString());
  if (curr == 50) gameOverWin();
  if (curr > highScore) {
    state.high_score = curr;
    gameHighScore.innerHTML = curr.toString();
  } else {
    gameHighScore.innerHTML = state.high_score.toString();
  }
}

/**
 * Updates the styling of the game tracker elements to match the given game level.
 * @param {number} level - The current game level.
 */
function levelUp(level: number): void {
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
async function checkBadgeStatus(
  badges: Badges,
  operator: OperatorVerbose,
  difficulty: string
): Promise<boolean> {
  // console.log("running Badge status check",badges[operator]['game'][difficulty] )
  // const reformattedOperator = utilMethods.reformatOperator(operator)

  if (badges[operator]["game"][difficulty] === false) return true;
  else return false;
}

async function updateLevel(): Promise<void> {
  // Gets the current level number and checks if the user has made progress towards the next level or not
  let level = parseInt(gameLevelNumber.textContent as string);
  const currScore: number = parseInt(gameCurrScore.textContent as string);
  if (currScore % 1 == 0) {
    updateProgress(currScore);
  }

  // Checks if the user has reached the next level and adds a new level to the game tracker
  if (currScore % 10 == 0) {
    let currDifficulty: number | null = Number(
      sessionStorage.getItem("activeDifficulty")
    );
    const activeOperator = <Operator>sessionStorage.getItem("activeOperators");
    const badgesFromDb = await retrieveBadges();

    // const activeBadges = sessionStorage.getItem("badges")
    // console.log("activeBadges",activeBadges['addition'])
    // await updateBadgeStatus("game", currDifficulty, activeOperator, true)

    let nextDifficulty = currDifficulty == 5 ? 5 : currDifficulty + 1;
    if (nextDifficulty > 5 || nextDifficulty < 1)
      throw new Error("Next Difficulty out of range");
    await utilMethods.updateLevelVisuals(
      nextDifficulty.toString() as Difficulty
    );
    if (activeOperator && currDifficulty) {
      utilMethods.updateGeneralSelected(
        activeOperator,
        nextDifficulty.toString() as Difficulty
      );
      sessionStorage.setItem("activeDifficulty", nextDifficulty.toString());
      utilMethods.updateDifficultyRange();
      if (
        await checkBadgeStatus(
          badgesFromDb,
          utilMethods.reformatOperator(activeOperator),
          currDifficulty.toString()
        )
      ) {
        animateBadge();
        await utilMethods.delay(200);
        const badgeImgs = document.getElementsByClassName("badge-img");
        // const badgesFromDb = await retrieveBadges()
        await updateBadgeStatus(
          "game",
          currDifficulty.toString(),
          activeOperator,
          true
        );
        const badgesFromDbUpdated = await retrieveBadges();

        updateChallengeBadgeAppearance(
          badgeImgs,
          badgesFromDbUpdated,
          activeOperator
        );
      }
    }

    await utilMethods.delay(300);

    // Disables the user input and resets the width of the game tracker
    utilMethods.disableInput(gameAnswerInput);
    utilMethods.resetWidth([gameTracker]);

    // Adds a new level to the game tracker and updates the level number
    // addlevel();
    // level += 1;

    // Animates the level up message and waits for 1 second before re-enabling the user input
    levelUp(level + 1);
    // questionLogic.newQuestion('game', activeOperator);
    // await utilMethods.delay(200);
    // utilMethods.enableInput(gameAnswerInput);
  }
  // Updates the level number displayed to the user
  gameLevelNumber.textContent = level.toString();
}

/**
 * Updates the width of the progress bar by adding a fraction of the full width to it.
 * If the progress bar is filled to its full width, it resets after a delay of 1 second.
 */
function updateProgress(questionNumber: number) {
  // Get the full width of the progress bar container and subtract the border width to get the actual width
  // console.log(questionNumber)
  // console.log(questionNumber%10)
  questionNumber = questionNumber > 10 ? questionNumber % 10 : questionNumber;
  let fullWidth: string = window.getComputedStyle(gameTrackerContainer).width;
  let borderWidth: string = window
    .getComputedStyle(gameTrackerContainer)
    .getPropertyValue("border-width");
  let fullWidthNum: number = parseFloat(fullWidth.slice(0, -2));

  let borderWidthNum: number = parseFloat(borderWidth.slice(0, -2));

  fullWidthNum = fullWidthNum - borderWidthNum * 2;

  // Get the current width of the progress bar and add a fraction of the full width to it
  let progressWidth: string = window.getComputedStyle(gameTracker).width;

  let progressWidthNum: number = parseFloat(progressWidth.slice(0, -2));

  progressWidthNum = (fullWidthNum / 10) * questionNumber;

  gameTracker.style.width = progressWidthNum.toString() + "px";

  // If the progress bar is filled to its full width, reset it after a delay of 1 second
  if (progressWidth >= fullWidth) {
    utilMethods.delay(1000);
    utilMethods.resetWidth([gameTracker]);
  }
}

//
//END GAME
////////////////////////////////////////////////////////////

// Adds an event listener to the gameAnswerInput element to update the user value when the input changes
function gameUpdateAnswerHandler(e: Event): void {
  let userAnswer = (e.target as HTMLInputElement).value;
  state.userValue = Number(userAnswer);
}

// Adds an event listener to the gameAnswerSubmit element to check the user's answer when the form is submitted
function gameCheckAnswerHandler(e: Event): void {
  let realAns: number = utilMethods.calculation(
    parseInt(gameNumOne.innerHTML),
    parseInt(gameNumTwo.innerHTML),
    gameOpOne.innerHTML as Operator
  ); // Calculate the correct answer using the gameNumOne, gameNumTwo, and gameOpOne elements

  gameActual.innerHTML = realAns.toString(); // Display the correct answer in the gameActual element
  gameAnswerCheck(realAns == state.userValue); // Check if the user's answer is correct using the gameAnswerCheck function
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
}
function gameOverWin() {
  alert(
    "You just beat the Challenge and got 50 questions correct! Great job! You're a Math Genius! Keep going to beat your high score!"
  );
}

function resetGameSettings() {
  // utilMethods.correctnessView(false, gameCorrectness);
  // utilMethods.incorrectMotion(gameCorrectness);
  const operator = <Operator>sessionStorage.getItem("activeOperators");
  console.log("operator reset", operator);
  // const difficulty = sessionStorage.getItem("activeDifficulty")
  utilMethods.disableInput(gameAnswerInput);
  // utilMethods.visibilityTimedToggle(true, gameActualContainer, 1000);

  utilMethods.resetAnswerInput([gameAnswerInput]);
  utilMethods.resetNumber(gameCurrScore, 1);
  utilMethods.resetLevelNumber(gameLevelNumber);
  utilMethods.resetWidth([gameTracker]);
  sessionStorage.setItem("activeDifficulty", "1");
  console.log("difficulty reset", sessionStorage.getItem("activeDifficulty"));

  utilMethods.updateLevelVisuals("1");
  console.log("is operator", operator);
  if (operator.length > 0) {
    console.log("is operator", operator);

    utilMethods.updateGeneralSelected(operator, "1");

    utilMethods.updateDifficultyRange();
    // Generate new question and re-enable input after a short period
    questionLogic.newQuestion("game", operator);
  } else throw new Error("Error: Session Storage couldn't be retrieved");

  utilMethods.delay(250);
  utilMethods.enableInput(gameAnswerInput);
}

const startOverButton = document.getElementById(
  "hsc-start-over"
) as HTMLElement;
startOverButton.addEventListener("click", resetGameSettings);

gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler); // Add an event listener to the gameAnswerInput element that updates the state with the user's answer
gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler); // Add an event listener to the gameAnswerSubmit element that checks the user's answer and updates the gameActual element

function updateChallengeBadgeAppearance(
  elements: HTMLCollectionOf<Element>,
  badges: Badges,
  operator: Operator
) {
  const reformattedOperator: OperatorVerbose =
    utilMethods.reformatOperator(operator);
  const bestBadges: [string, string, string][] = getHighestBadge(badges);

  for (let best of bestBadges) {
    if (
      best[2] !== "0" &&
      best[0] == reformattedOperator &&
      best[1] == "game"
    ) {
      const highestLevel = best[2];
      for (let element of elements) {
        let difficulty = element.getAttribute("data-badge-number");
        if (difficulty && difficulty <= highestLevel) {
          element.classList.add("active");
        }
      }
    }
  }
}

window.onload = function () {
  let operator = sessionStorage.getItem("activeOperators");
  console.log("operator", operator);
  let difficulty = sessionStorage.getItem("activeDifficulty");
  console.log("difficulty", difficulty);
  let difficultyNumber = 1;
  const nums = ["1", "2", "3", "4", "5"];

  if (difficulty && nums.includes(difficulty)) {
    difficultyNumber = Number(difficulty);
  }

  const badgeImgs = document.getElementsByClassName("badge-img");

  // Use then to handle the promise returned by retrieveBadges
  retrieveBadges().then((badgesFromDb) => {
    if (operator) {
      updateChallengeBadgeAppearance(
        badgeImgs,
        badgesFromDb,
        operator as Operator
      );
    } else {
      throw new Error("ChallengeBadges not Update. SessionStorage Data error");
    }

    utilMethods.resetNumber(gameCurrScore, difficultyNumber);

    questionLogic.newQuestion("game", operator as Operator);
  });
};
resetGameSettings();
