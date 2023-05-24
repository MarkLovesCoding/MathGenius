import { state } from '../state.js';
import { changeViewRight } from '../utils.js';
const operatorContainer = document.getElementById("operator-menu-container");
const activityContainer = document.getElementById("real-menu-container");
const linkToGame = document.getElementById('new-game');
linkToGame.addEventListener("click", function () {
  // navigate to a different page
  sessionStorage.setItem("activity", "game");

  // state.activity = "game"
  // window.location.href = "/tests";
  changeViewRight(activityContainer, operatorContainer);
  // loadSection('operator-menu')
});

const linkToQuiz = document.getElementById('new-quiz');
linkToQuiz.addEventListener("click", function () {
  sessionStorage.setItem("activity", "quiz");

  // state.activity = "quiz"
  changeViewRight(activityContainer, operatorContainer);

  // window.location.href = "/practice";
  // utilMethods.loadSection('practice-menu')
  // loadSection('operator-menu')
});

const linkToMCQuiz = document.getElementById('new-mc-quiz');
linkToMCQuiz.addEventListener("click", function () {
  sessionStorage.setItem("activity", "multiple-choice-quiz");

  // state.activity = "multiple-choice-quiz"

  // window.location.href = "/practice";
  changeViewRight(activityContainer, operatorContainer);

  // loadSection('operator-menu')
});