// Import the state object from '../state.js'
import { state } from '../state.js';
// Import the changeViewRight function from '../utils.js'
import { changeViewRight,updateActivitySelected } from '../utils.js';

// Get references to the necessary elements
const operatorContainer = <HTMLElement>document.getElementById("operator-menu-container") 
const activityContainer = <HTMLElement>document.getElementById("practice-menu-container") 

// Get references to the necessary links
const linkToFlash = <HTMLElement>document.getElementById('new-flash') 
const linkToMC = <HTMLElement>document.getElementById('new-mc') 

// Add event listener for linkToFlash
if(linkToFlash)linkToFlash.addEventListener("click", function () {
  // Set "activity" value in sessionStorage and state
  sessionStorage.setItem("activity", "flash");
  state.activity = "flash";
  updateActivitySelected("flash")
  
  // Call the changeViewRight function to change the view
  changeViewRight(activityContainer, operatorContainer);
});

// Add event listener for linkToMC
if(linkToMC)linkToMC.addEventListener("click", function () {
  // Set "activity" value in sessionStorage and state
  sessionStorage.setItem("activity", "multiple-choice");
  state.activity = "multiple-choice";
  updateActivitySelected("multiple-choice")
  // Call the changeViewRight function to change the view
  changeViewRight(activityContainer, operatorContainer);
});
