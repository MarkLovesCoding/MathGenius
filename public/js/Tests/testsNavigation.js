// Import the changeViewRight function from '../utils.js'
import { changeViewRight,updateActivitySelected } from '../utils.js';

// Get references to the necessary elements
const operatorContainer = document.getElementById("operator-menu-container");
const activityContainer = document.getElementById("real-menu-container");

// Add event listener for linkToGame
const linkToGame = document.getElementById('new-game');
linkToGame.addEventListener("click", function () {
  // Set "activity" value in sessionStorage
  sessionStorage.setItem("activity", "game");
  updateActivitySelected("game")
  
  // Call the changeViewRight function to change the view
  changeViewRight(activityContainer, operatorContainer);
});

// Add event listener for linkToQuiz
const linkToQuiz = document.getElementById('new-quiz');
linkToQuiz.addEventListener("click", function () {
  // Set "activity" value in sessionStorage
  sessionStorage.setItem("activity", "quiz");
  updateActivitySelected("quiz")
  
  // Call the changeViewRight function to change the view
  changeViewRight(activityContainer, operatorContainer);
});

// Add event listener for linkToMCQuiz
const linkToMCQuiz = document.getElementById('new-mc-quiz');
linkToMCQuiz.addEventListener("click", function () {
  // Set "activity" value in sessionStorage
  sessionStorage.setItem("activity", "multiple-choice-quiz");
  updateActivitySelected("multiple-choice-quiz")
  // Call the changeViewRight function to change the view
  changeViewRight(activityContainer, operatorContainer);
});
// Add event listener for linkToMCQuiz
