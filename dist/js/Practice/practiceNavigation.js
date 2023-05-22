import { state } from '../state.js';
// import {loadSection} from '../ulils.js'
import { changeViewRight } from '../utils.js';
const operatorContainer = document.getElementById("operator-menu-container");
const activityContainer = document.getElementById("practice-menu-container");
const linkToFlash = document.getElementById('new-flash');
linkToFlash.addEventListener("click", function () {
  // navigate to a different page

  state.activity = "flash";
  // window.location.href = "/tests";
  changeViewRight(activityContainer, operatorContainer);
  // utilMethods.loadSection('operator-menu')
});

const linkToMC = document.getElementById('new-mc');
linkToMC.addEventListener("click", function () {
  state.activity = "multiple-choice";
  changeViewRight(activityContainer, operatorContainer);
  // window.location.href = "/practice";
  // utilMethods.loadSection('practice-menu')
  // utilMethods.loadSection('operator-menu')
});