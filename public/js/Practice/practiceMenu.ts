


import * as utilMethods from '../utils.js';
// import { mcCreateOptions } from './practice_MultipleChoice.js';
import type {DifficultyLevel} from '../types.js'


window.onload = function () {  //Ensure DOM is loaded before functions

  sessionStorage.setItem("activeDifficulty","1")

  ////////////////////////////////////////////////////////////
  //SHARED
  //


  // Function to update the difficulty range based on the current active difficulty level
  // function updateDifficultyRange() {
  //   let i = state.activeDifficulty, highVal, lowVal;

  //   // Set the high and low values based on the current active difficulty level
  //   switch (i) {
  //     case 1:
  //       highVal = 5;
  //       lowVal = 0;
  //       break;
  //     case 2:
  //       highVal = 6;
  //       lowVal = 1;
  //       break;
  //     case 3:
  //       highVal = 8;
  //       lowVal = 2;
  //       break;
  //     case 4:
  //       highVal = 10;
  //       lowVal = 3;
  //       break;
  //     case 5:
  //       highVal = 12;
  //       lowVal = 3;
  //       break;
  //   }
  //   sessionStorage.setItem("activeMulitplyLowVal", lowVal)

  //   sessionStorage.setItem("activeMultiplyHighVal", highVal)
  //   sessionStorage.setItem("activeDifficulty", i)
    // Set the active multiply low and high values based on the low and high values set above
    // state.activeMultiplyLowVal = lowVal;
    // state.activeMultiplyHighVal = highVal;
    // let highValue = (i) * 10;

    // sessionStorage.setItem("activeHighVal", highValue)

    // Set the active high value based on the current active difficulty level
    // state.activeHighVal = (i) * 10;
  



  // const operatorMenuForward = document.getElementById("operator-menu-forward") as HTMLElement
  // const operatorPracticeMenuBackwarUpper = document.getElementById("operator-practice-menu-backward-upper")
  const operatorPracticeMenuBackwardLower = <HTMLElement>document.getElementById("operator-practice-menu-backward-lower") 
  // const operatorPracticeMenuBackwards = [ operatorPracticeMenuBackwardLower];

  const difficultyMenuForward = <HTMLElement>document.getElementById("difficulty-menu-forward") 
  // const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper")
  const difficultyMenuBackwardLower = <HTMLElement>document.getElementById("difficulty-menu-backward-lower") 

  // const difficultyMenuBackwards = [ difficultyMenuBackwardLower]
  const activitiesChoices = <NodeListOf<Element>>document.querySelectorAll(".activity-choice")
  const practiceChoices = <NodeListOf<Element>>document.querySelectorAll(".practice-choice")
  const operatorChoices = <NodeListOf<Element>>document.querySelectorAll(".operator-choice") 
  // const operatorAlert = document.getElementById("operator-alert-modal") as HTMLElement

  const operatorContainer = <HTMLElement>document.getElementById("operator-menu-container") 
  const activityContainer = <HTMLElement>document.getElementById("practice-menu-container") 
  const difficultyContainer = <HTMLElement>document.getElementById("difficulty-menu-container") 

  const rangeInput = <HTMLInputElement>document.getElementById("range-input") 
  const rangeValue = <HTMLElement>document.getElementById("range-value") 
  const levelText = <HTMLElement>document.getElementById("level-text") 
  // Handle the click event on the operatorMenuForward button
  // operatorMenuForward.addEventListener("click", (e) => {

  //   // Update the active operators based on the user's selection
  //   state.activeOperators = updateOperators(operatorChoices)
  //   sessionStorage.setItem("activeOperators", state.activeOperators)
  //   // Show an error message if no operators are selected, and prevent the page from reloading
  //   if (state.activeOperators.length == 0) {
  //     utilMethods.visibilityTimedToggle(true, operatorAlert, 1100)
  //     return;
  //   }
  //   utilMethods.changeViewRight(operatorContainer, difficultyContainer);
  //   // Load the difficulty-menu section
  //   // utilMethods.loadSection("difficulty-menu")
  // })
  // for (let el of operatorPracticeMenuBackwards) {
    operatorPracticeMenuBackwardLower.addEventListener("click", () => {
      utilMethods.changeViewLeft(activityContainer, operatorContainer);
    })
  // }


  // Handle the click event on the difficultyMenuBackwards button
  // for (let el of difficultyMenuBackwards) {
    difficultyMenuBackwardLower.addEventListener("click", () => {
      utilMethods.changeViewLeft(operatorContainer, difficultyContainer);
    })
  // }

  // Handle the click event on the difficultyMenuForward button
  difficultyMenuForward.addEventListener("click", () => {

    // Update the difficulty range based on the user's selection
    utilMethods.updateDifficultyRange()

    // Generate a new question based on the chosen activity and active operators
    if (sessionStorage.getItem("activity") === "multiple-choice") {
      window.location.href = "/multiple-choice"
    }

    else if (sessionStorage.getItem("activity") === "flash") {
      window.location.href = "/flash"
    }
  })


  // A function to add event listeners for activity types (real/practice)
  function addEventsForTypes(activitiesChoices:NodeListOf<Element>) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", () => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
        // Remove the "activity-selected" class from all activity options
        // let type;
        // if (e.target.getAttribute("data-type")) {
        //   type = e.target.getAttribute("data-type")
        // }
        // else {
        //   type = e.target.parentNode.getAttribute("data-type")
        // }
        // Determine which activity type was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected")
        // Add the "activity-selected" class to the selected activity option


      })
    }
  }

  // A function to add event listeners for specific activities (e.g., real addition, practice multiplication)
  function addEventsForActivities(activitiesChoices:NodeListOf<Element>) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", () => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
        // Remove the "activity-selected" class from all activity options
        // let type;
        // if (e.target.getAttribute("data-type")) {
        //   type = e.target.getAttribute("data-type")
        // }
        // else {
        //   type = e.target.parentNode.getAttribute("data-type")
        // }
        // Determine which activity was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected")

        // Add the "activity-selected" class to the selected activity option

      })
    }
  }



  // A function to add event listeners for operators (+, -, x, ÷)

  function addEventsForOperators(operatorsChoices:NodeListOf<Element>) {
    for (let operator of operatorsChoices) {
      // operator.addEventListener("click", toggleOperators)
      
      operator.addEventListener("click", () => {
        operatorsChoices.forEach(operator => operator.classList.remove("active-operator"))
        // Remove the "activity-selected" class from all activity options
        // let type;
        // if (e.target.getAttribute("data-sub")) {
        //   type = e.target.getAttribute("data-sub")
        // }
        // else {
        //   type = e.target.parentNode.getAttribute("data-sub")
        // }
        // Determine which activity was selected by looking at the "data-type" attribute
        operator.classList.add("active-operator")
        let updatedOperator = updateOperator(operatorChoices)
        sessionStorage.setItem("activeOperators", updatedOperator)
        // let activity =  sessionStorage.getItem("activity")

        // const activitySelected = sessionStorage.getItem("activity")
        // utilMethods.updateActivitySelected(activitySelected)
       
        utilMethods.updateOperatorSelected(updatedOperator)
        utilMethods.changeViewRight(operatorContainer, difficultyContainer);
        // Add the "activity-selected" class to the selected activity option

      })

    }
  }
  addEventsForTypes(activitiesChoices)
  addEventsForOperators(operatorChoices)


  addEventsForActivities(practiceChoices)

  function updateOperator(operatorChoices:NodeListOf<Element>) {
    let operatorText:string ="+";

    for (let i = 0; i < 4; i++) {
      if (operatorChoices[i].classList.contains("active-operator")) {

        // Assign the operator symbol based on the id attribute of the selected operator element
      
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
        sessionStorage.setItem("activeOperators",operatorText)
        
      }
    }

    // Return the array of active operators
    return operatorText;
  }

  // Initialize variables for the range input, range value, and level text elements
// Initialize variables for the range input, range value, and level text elements

// Define an interface for the structure of each difficulty level

// Type the difficultyLevels object using the DifficultyLevel interface
const difficultyLevels: Record<string, DifficultyLevel> = {
  "1": { name: "Easy", color: "green" },
  "2": { name: "Novice", color: "yellow" },
  "3": { name: "Intermediate", color: "orange" },
  "4": { name: "Advanced", color: "red" },
  "5": { name: "Genius!", color: "purple" }
};

// Add an event listener for when the range input is changed
rangeInput.addEventListener("input", () => {
  // Get the selected difficulty level from the range input value
  const selectedDifficulty: number = parseInt(rangeInput.value, 10);

  // Update the active difficulty level in the session storage and update the range value text
  sessionStorage.setItem("activeDifficulty", selectedDifficulty.toString());

  rangeValue.textContent = selectedDifficulty.toString();
  // Check if selectedDifficulty is a valid key in difficultyLevels
  if (difficultyLevels.hasOwnProperty(selectedDifficulty)) {
    // Set the color of the range input thumb based on the selected difficulty level
    const sliderColor: string = difficultyLevels[selectedDifficulty].color;
    rangeInput.style.setProperty('--thumb-color', sliderColor);

    // Update the level text with the name of the selected difficulty level
    levelText.textContent = difficultyLevels[selectedDifficulty].name;
  } else {
    // Handle the case where selectedDifficulty is not a valid key (optional)
    console.error(`Invalid difficulty level: ${selectedDifficulty}`);
  }
  // Set the color of the range input thumb based on the selected difficulty level

});

// Close window.onload function (if it's open)

} //close window.onload function
