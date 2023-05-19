import * as utilMethods from '../ulils.js';
import { state } from '../state.js';
import * as questionLogic from '../sharedQuestionLogic.js';

// Might be a better way to organize this/
import { mcQuizCreateOptions } from './test_MultipleChoiceQuiz.js';
window.onload = function () {
  //Ensure DOM is loaded before functions

  // Function to update the difficulty range based on the current active difficulty level
  function updateDifficultyRange() {
    let i = state.activeDifficulty,
      highVal,
      lowVal;

    // Set the high and low values based on the current active difficulty level
    switch (i) {
      case 1:
        highVal = 5;
        lowVal = 0;
        break;
      case 2:
        highVal = 6;
        lowVal = 1;
        break;
      case 3:
        highVal = 8;
        lowVal = 2;
        break;
      case 4:
        highVal = 10;
        lowVal = 3;
        break;
      case 5:
        highVal = 12;
        lowVal = 3;
        break;
    }

    // Set the active multiply low and high values based on the low and high values set above
    state.activeMultiplyLowVal = lowVal;
    state.activeMultiplyHighVal = highVal;

    // Set the active high value based on the current active difficulty level
    state.activeHighVal = i * 10;
  }
  const operatorMenuForward = document.getElementById("operator-menu-forward");
  const operatorTestMenuBackwarUpper = document.getElementById("operator-test-menu-backward-upper");
  const operatorTestMenuBackwardLower = document.getElementById("operator-test-menu-backward-lower");
  const difficultyMenuForward = document.getElementById("difficulty-menu-forward");
  const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper");
  const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower");
  const operatorTestMenuBackwards = [operatorTestMenuBackwarUpper, operatorTestMenuBackwardLower];
  const difficultyMenuBackwards = [difficultyMenuBackwardUpper, difficultyMenuBackwardLower];
  // const practiceMenuBackwards = [practiceMenuBackwardUpper, practiceMenuBackwardLower]

  const activitiesChoices = document.querySelectorAll(".activity-choice");
  const realChoices = document.querySelectorAll(".real-choice");
  // const practiceChoices = document.querySelectorAll(".practice-choice")

  const operatorAlert = document.getElementById("operator-alert-modal");

  // Handle the click event on the operatorMenuForward button
  operatorMenuForward.addEventListener("click", e => {
    // Update the active operators based on the user's selection
    state.activeOperators = updateOperators(operatorChoices);

    // Show an error message if no operators are selected, and prevent the page from reloading
    if (state.activeOperators.length == 0) {
      utilMethods.visibilityTimedToggle(true, operatorAlert, 1100);
      return;
    }

    // Load the difficulty-menu section
    utilMethods.loadSection("difficulty-menu");
  });
  for (let el of operatorTestMenuBackwards) {
    el.addEventListener("click", e => {
      utilMethods.loadSection("real-menu");
    });
  }

  // Handle the click event on the difficultyMenuBackwards button
  for (let el of difficultyMenuBackwards) {
    el.addEventListener("click", e => {
      utilMethods.loadSection("operator-menu");
    });
  }

  // Handle the click event on the difficultyMenuForward button
  difficultyMenuForward.addEventListener("click", e => {
    // Update the difficulty range based on the user's selection
    updateDifficultyRange();

    // Generate a new question based on the chosen activity and active operators
    // if (state.activity === "multiple-choice") {
    //   newQuestion(state.activity, state.activeOperators, mcCreateOptions)
    // }
    // else 
    if (state.activity === "multiple-choice-quiz") {
      questionLogic.newQuestion(state.activity, state.activeOperators, mcQuizCreateOptions);
    } else {
      questionLogic.newQuestion(state.activity, state.activeOperators);
    }
  });

  // A function to add event listeners for activity types (real/practice)
  function addEventsForTypes(activitiesChoices, state) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", e => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"));
        // Remove the "activity-selected" class from all activity options
        let type;
        if (e.target.getAttribute("data-type")) {
          type = e.target.getAttribute("data-type");
        } else {
          type = e.target.parentNode.getAttribute("data-type");
        }
        // Determine which activity type was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected");
        // Add the "activity-selected" class to the selected activity option
        state.type = type;
        // Set the state's "type" property to the selected activity type
      });
    }
  }

  // A function to add event listeners for specific activities (e.g., real addition, practice multiplication)
  function addEventsForActivities(activitiesChoices, state) {
    for (let activity of activitiesChoices) {
      activity.addEventListener("click", e => {
        activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"));
        // Remove the "activity-selected" class from all activity options
        let type;
        if (e.target.getAttribute("data-type")) {
          type = e.target.getAttribute("data-type");
        } else {
          type = e.target.parentNode.getAttribute("data-type");
        }
        // Determine which activity was selected by looking at the "data-type" attribute
        activity.classList.add("activity-selected");

        // Add the "activity-selected" class to the selected activity option
        state.type = type;

        // Set the state's "type" property to the selected activity
      });
    }
  }

  // A function to toggle the "active-operator" class when an operator is clicked
  function toggleOperators(e) {
    e.target.classList.toggle("active-operator");
  }
  const operatorChoices = document.querySelectorAll(".operator-choice");

  // A function to add event listeners for operators (+, -, x, ÷)
  function addEventsForOperators(operatorsChoices) {
    for (let operator of operatorsChoices) {
      operator.addEventListener("click", toggleOperators);
    }
  }
  addEventsForTypes(activitiesChoices, state);
  addEventsForOperators(operatorChoices, state);
  addEventsForActivities(realChoices, state);
  // addEventsForActivities(practiceChoices, state)

  // A function to determine which activity was selected by the user
  // function updateActivity(activitiesChoices, numChoices) {
  //   let userSelection;
  //   for (let i = 0; i < numChoices; i++) {
  //     if (activitiesChoices[i].classList.contains("activity-selected")) {
  //       userSelection = activitiesChoices[i].getAttribute("data-type")
  //     }
  //   }
  //   return userSelection;
  // }

  function updateOperators(operatorChoices) {
    let ops = [];
    let amount = 0;
    for (let i = 0; i < 4; i++) {
      if (operatorChoices[i].classList.contains("active-operator")) {
        // Assign the operator symbol based on the id attribute of the selected operator element
        let operatorText;
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
        state.activeOperators.push(operatorText);
        ops.push(operatorText);
        amount++;
      }
    }

    // Return the array of active operators
    return ops;
  }

  // Initialize variables for the range input, range value, and level text elements
  var rangeInput = document.getElementById("range-input");
  var rangeValue = document.getElementById("range-value");
  var levelText = document.getElementById("level-text");

  // Add an event listener for when the range input is changed
  rangeInput.addEventListener("input", () => {
    // Get the selected difficulty level from the range input value
    let selectedDifficulty = parseInt(rangeInput.value);

    // Update the active difficulty level in the state object and update the range value text
    state.activeDifficulty = selectedDifficulty;
    rangeValue.textContent = selectedDifficulty;

    // Set the color of the range input thumb based on the selected difficulty level
    var sliderColor = state.difficultyLevels[selectedDifficulty].color;
    rangeInput.style.setProperty('--thumb-color', sliderColor);

    // Update the level text with the name of the selected difficulty level
    levelText.textContent = state.difficultyLevels[selectedDifficulty].name;
  });
}; //close window.onload function