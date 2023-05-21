  
  import * as utilMethods from '../ulils.js';
  import { state } from '../state.js'
  import * as questionLogic from '../sharedQuestionLogic.js';
  import {  mcOptions } from '../domElements.js';



  
  
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
 export function mcCreateOptions(n1, n2, o1) {
    // Create an array of four possible answer options using the given numbers and operator
    let options = utilMethods.createOptions(n1, n2, o1)
  
    // Clear the mcOptions element (which contains the multiple choice answer buttons)
    mcOptions.innerHTML = "";
  
    // Calculate the correct answer for the question
    let ans = utilMethods.calculation(n1, n2, o1)
  
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
  


  window.onload = function(){
    let operators = utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"))
    state.activeOperators=operators
    sessionStorage.setItem("activeOperators",operators)
    // sessionStorage.setItem("",operators)
    // questionLogic.newGeneralQuestion(flashOpOne,flashNumOne,flashNumTwo,state.activeOperators)
    questionLogic.newQuestion('multiple-choice',operators,mcCreateOptions);
  } 
  //
  //END MC
  ////////////////////////////////////////////////////////////



