import { state } from './state.js';
import { loadSection } from './ulils.js';
const linkToGame = document.getElementById('new-game');
linkToGame.addEventListener("click", function () {
  // navigate to a different page

  state.activity = "game";
  // window.location.href = "/tests";

  loadSection('operator-menu');
});
const linkToQuiz = document.getElementById('new-quiz');
linkToQuiz.addEventListener("click", function () {
  state.activity = "quiz";

  // window.location.href = "/practice";
  // utilMethods.loadSection('practice-menu')
  loadSection('operator-menu');
});
const linkToMCQuiz = document.getElementById('new-mc-quiz');
linkToMCQuiz.addEventListener("click", function () {
  state.activity = "mc-quiz";

  // window.location.href = "/practice";

  loadSection('operator-menu');
});