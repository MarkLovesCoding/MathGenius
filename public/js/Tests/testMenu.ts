


import * as utilMethods from '../utils.js';
import { DifficultyLevel } from '../types.js';



window.onload = function () {  //Ensure DOM is loaded before functions
  //default
  sessionStorage.setItem("activeDifficulty", "1")


  // Function to update the difficulty range based on the current active difficulty level

  // const operatorTestMenuBackwarUpper = document.getElementById("operator-test-menu-backward-upper")
  const operatorTestMenuBackwardLower = document.getElementById("operator-test-menu-backward-lower") as HTMLElement
  const difficultyMenuForward = document.getElementById("difficulty-menu-forward") as HTMLElement
  // const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper")
  const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower") as HTMLElement
  // const operatorTestMenuBackwards = [operatorTestMenuBackwardLower];
  // const difficultyMenuBackwards = [difficultyMenuBackwardLower]
  const activitiesChoices = document.querySelectorAll(".activity-choice") as NodeListOf<Element>
  const realChoices = document.querySelectorAll(".real-choice") as  NodeListOf<Element>
  const operatorContainer = document.getElementById("operator-menu-container") as HTMLElement
  const activityContainer = document.getElementById("real-menu-container") as HTMLElement
  const difficultyContainer = document.getElementById("difficulty-menu-container") as HTMLElement
const operatorChoices = document.querySelectorAll(".operator-choice") as  NodeListOf<Element>


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
  // })


  // for (let el of operatorTestMenuBackwards) {
    operatorTestMenuBackwardLower.addEventListener("click", () => {
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
    if (sessionStorage.getItem("activity") === "multiple-choice-quiz") {
      window.location.href = "/multiple-choice-quiz"

    }
    else if (sessionStorage.getItem("activity") === "game") {
      window.location.href = "/high-score-challenge"

    }
    else if (sessionStorage.getItem("activity") === "quiz") {
      window.location.href = "pop-quiz"

    }
  })


  // A function to add event listeners for activity types (real/practice)
  function addEventsForTypesOrActivities(activitiesChoices:NodeListOf<Element>) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", () => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
        // Remove the "activity-selected" class from all activity options
        // let type;
        // if ((e.target as HTMLElement).getAttribute("data-type")) {
        //   type =(e.target as HTMLElement).getAttribute("data-type")
        // }
        // else if(e.target instanceof HTMLElement && e.target.parentNode instanceof HTMLElement ){
        //   type = e.target?.parentNode?.getAttribute("data-type")
        // }
        // Determine which activity type was selected by looking at the "data-type" attribute
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
        // if ((e.target as HTMLElement).getAttribute("data-sub")) {
        //   type =( e.target as HTMLElement).getAttribute("data-sub")
        // }
        // else if(e.target instanceof HTMLElement && e.target.parentNode instanceof HTMLElement){
        //   type = e.target.parentNode.getAttribute("data-sub")
        // }
        // Determine which activity was selected by looking at the "data-type" attribute
        operator.classList.add("active-operator")
        let updatedOperator:string|undefined = updateOperator(operatorChoices)
        if(updatedOperator){ sessionStorage.setItem("activeOperators", updatedOperator) } else throw new Error("Session Storage for Operator not Set")
        let activity:string|null = sessionStorage.getItem("activity")
        utilMethods.updateOperatorSelected(updatedOperator)
        if (activity == "game") {
          sessionStorage.setItem("activeDifficulty", "1")

          window.location.href = "/high-score-challenge"
        }
        else {
          utilMethods.changeViewRight(operatorContainer, difficultyContainer);

        }
        // Add the "activity-selected" class to the selected activity option

      })

    }
  }
  addEventsForTypesOrActivities(activitiesChoices)
  addEventsForTypesOrActivities(realChoices)
  addEventsForOperators(operatorChoices)

  function updateOperator(operatorChoices:NodeListOf<Element>):string {

    let operatorText:string="+"

    // let amount = 0;
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
        // state.activeOperators.push(operatorText);

        sessionStorage.setItem("activeOperators", operatorText)
        // ops.push(operatorText);
        // amount++;
      }
    }

    // Return the array of active operators
    return operatorText;
  }



// Initialize variables for the range input, range value, and level text elements
const rangeInput = document.getElementById("range-input") as HTMLInputElement;
const rangeValue = document.getElementById("range-value") as HTMLElement;
const levelText = document.getElementById("level-text") as HTMLElement;

const difficultyLevels: Record<number, DifficultyLevel> = {
  1: { name: "Easy", color: "green" },
  2: { name: "Novice", color: "yellow" },
  3: { name: "Intermediate", color: "orange" },
  4: { name: "Advanced", color: "red" },
  5: { name: "Genius!", color: "purple" }
};

// Add an event listener for when the range input is changed
rangeInput.addEventListener("input", () => {
  // Get the selected difficulty level from the range input value
  const selectedDifficulty = parseInt(rangeInput.value, 10);

  // Update the active difficulty level in the session storage and update the range value text
  sessionStorage.setItem("activeDifficulty", selectedDifficulty.toString());
  rangeValue.textContent = selectedDifficulty.toString();

  // Set the color of the range input thumb based on the selected difficulty level
  const sliderColor = difficultyLevels[selectedDifficulty].color;
  rangeInput.style.setProperty("--thumb-color", sliderColor);

  // Update the level text with the name of the selected difficulty level
  levelText.textContent = difficultyLevels[selectedDifficulty].name;
});


} //close window.onload function
