import * as utilMethods from './ulils.js';
import { flashAnswer, flashCard, flashNumOne, flashNumTwo, flashOpOne } from './domElements.js';
import { mcOptions } from './domElements.js';
import { state } from './state.js';
import * as questionLogic from './sharedQuestionLogic.js';
window.onload = function () {
  //Ensure DOM is loaded before functions

  ////////////////////////////////////////////////////////////
  //SHARED
  //

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

  ////////////////////////////////////////////////////////////
  //MC
  //

  /**
   * Checks whether the multiple-choice answer is correct or not.
   * If the answer is correct, animate the correct element and move on to the next question.
   * If the answer is incorrect, animate both the false element and the correct element and move on to the next question.
   *
   * @param {boolean} bool - true if the answer is correct, false otherwise
   * @param {HTMLElement} correctEl - the HTML element that represents the correct answer
   * @param {HTMLElement} falseEl - (optional) the HTML element that represents the incorrect answer
   * @returns {void}
   */
  async function mcAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(250);
      questionLogic.newQuestion("multiple-choice", state.activeOperators, mcCreateOptions);
    } else {
      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(250);
      questionLogic.newQuestion("multiple-choice", state.activeOperators, mcCreateOptions);
    }
  }

  /**
   * Generates the multiple-choice options for the given numbers and operator.
   *
   * @param {number} n1 - the first number
   * @param {number} n2 - the second number
   * @param {string} o1 - the operator
   * @returns {void}
   */
  function mcCreateOptions(n1, n2, o1) {
    // Create an array of four possible answer options using the given numbers and operator
    let options = utilMethods.createOptions(n1, n2, o1);

    // Clear the mcOptions element (which contains the multiple choice answer buttons)
    mcOptions.innerHTML = "";

    // Calculate the correct answer for the question
    let ans = utilMethods.calculation(n1, n2, o1);

    // Loop through each answer option and create a button for it
    options.forEach((option, index) => {
      const optionEl = document.createElement("button");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      let correctOption;

      // If this answer option is equal to the correct answer, save a reference to the button as the correct option
      if (option == ans) {
        correctOption = optionEl;
      }

      // Add a mousedown event listener to each button that checks if the answer is correct or not
      optionEl.addEventListener("mousedown", function (e) {
        let targetEl = e.target;
        if (targetEl.textContent == ans) {
          // If the selected answer is correct, call mcAnswerCheck with a "true" value and the target element
          mcAnswerCheck(true, targetEl);
        }
        if (targetEl.textContent != ans) {
          // If the selected answer is incorrect, call mcAnswerCheck with a "false" value, the correct option element, and the target element
          mcAnswerCheck(false, correctOption, targetEl);
        }
      });

      // Add the answer option button to the mcOptions element
      mcOptions.appendChild(optionEl);
    });
  }

  //
  //END MC
  ////////////////////////////////////////////////////////////

  function flashHandler(e) {
    const ans = utilMethods.calculation(flashNumOne.innerHTML, flashNumTwo.innerHTML, flashOpOne.innerHTML); // Calculate the correct answer using the flashNumOne, flashNumTwo, and flashOpOne elements
    flashAnswer.textContent = ans; // Display the correct answer in the flashAnswer element
    if (this.classList.contains("flip")) {
      // If the flashCard element has the "flip" class, generate a new question
      questionLogic.newQuestion("flash", state.activeOperators);
    }
    this.classList.toggle("flip"); // Toggle the "flip" class on the flashCard element
    e.preventDefault(); // Prevent the default behavior of the mousedown event on the flashCard element
  }

  flashCard.addEventListener("mousedown", flashHandler, false); // Add a mousedown event listener to the flashCard element that handles flipping the card and checking the answer

  ;
  const operatorMenuForward = document.getElementById("operator-menu-forward");
  const operatorPracticeMenuBackwarUpper = document.getElementById("operator-practice-menu-backward-upper");
  const operatorPracticeMenuBackwardLower = document.getElementById("operator-practice-menu-backward-lower");
  const operatorPracticeMenuBackwards = [operatorPracticeMenuBackwarUpper, operatorPracticeMenuBackwardLower];
  const difficultyMenuForward = document.getElementById("difficulty-menu-forward");
  const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper");
  const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower");

  // const operatorMenuBackwards = [operatorMenuBackwarUpper, operatorMenuBackwardLower];
  const difficultyMenuBackwards = [difficultyMenuBackwardUpper, difficultyMenuBackwardLower];
  // const practiceMenuBackwards = [practiceMenuBackwardUpper, practiceMenuBackwardLower]
  // const realMenuBackwards = [realMenuBackwardUpper, realMenuBackwardLower]
  const activitiesChoices = document.querySelectorAll(".activity-choice");
  // const realChoices = document.querySelectorAll(".real-choice")
  const practiceChoices = document.querySelectorAll(".practice-choice");

  // function alertChooseActivity() {
  //   const newModal = document.createElement("div");
  //   newModal.innerHTML = "Please Select An Activity"

  // }
  // const activityAlert = document.getElementById("activity-alert-modal")
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
  for (let el of operatorPracticeMenuBackwards) {
    el.addEventListener("click", e => {
      utilMethods.loadSection("practice-menu");
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
    if (state.activity === "multiple-choice") {
      questionLogic.newQuestion(state.activity, state.activeOperators, mcCreateOptions);
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
  // addEventsForActivities(realChoices, state)
  addEventsForActivities(practiceChoices, state);

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