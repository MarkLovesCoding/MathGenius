import { state } from './state.js';
import { loadSection } from './ulils.js';
const linkToTests = document.getElementById('new-real');
linkToTests.addEventListener("click", function () {
  // navigate to a different page

  state.type = "real";
  window.location.href = "/tests";

  //    loadSection('real-menu')
});

const linkToPractice = document.getElementById('new-practice');
linkToPractice.addEventListener("click", function () {
  state.type = "practice";
  window.location.href = "/practice";
  //    loadSection('practice-menu')
});