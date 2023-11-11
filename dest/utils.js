"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reformatOperator = exports.updateDifficultyRange = exports.setHighLowVals = exports.updateLevelVisuals = exports.updateGeneralSelected = exports.updateOperatorSelected = exports.updateActivitySelected = exports.createDifficultyText = exports.changeViewRight = exports.changeViewLeft = exports.convertStringToArray = exports.correctnessView = exports.getStyle = exports.incorrectMotion = exports.animateIncorrect = exports.animateCorrect = exports.emphasize = exports.toggleActivate = exports.showHide = exports.visibilityToggle = exports.visibilityTimedToggle = exports.resetAnswerInput = exports.resetWidth = exports.resetLevelNumber = exports.resetNumber = exports.enableInput = exports.disableInput = exports.loadSection = exports.delay = exports.createOptions = exports.shuffle = exports.randomNumber = exports.calculation = exports.percentage = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
//////////////////////////// MATH Methods
//
/**
 * Adds two numbers.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
exports.add = add;
/**
 * Subtracts two numbers.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The result of subtracting the second number from the first.
 */
function subtract(num1, num2) {
    return num1 - num2;
}
exports.subtract = subtract;
/**
 * Multiplies two numbers.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The product of the two numbers.
 */
function multiply(num1, num2) {
    return num1 * num2;
}
exports.multiply = multiply;
/**
 * Divides two numbers.
 * @param num1 - The numerator.
 * @param num2 - The denominator (should not be zero).
 * @returns The result of dividing the first number by the second.
 */
function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return num1 / num2;
}
exports.divide = divide;
/**
 * Calculates the percentage of a number.
 * @param n1 - The number to find the percentage of.
 * @param n2 - The total or base value.
 * @returns The calculated percentage.
 */
function percentage(n1, n2) {
    return Math.round((n1 / n2) * 100);
}
exports.percentage = percentage;
/**
 * Performs a calculation based on the operator.
 * @param n1 - The first operand.
 * @param n2 - The second operand.
 * @param o1 - The operator ('+', '-', 'x', '÷').
 * @returns The result of the calculation.
 */
function calculation(n1, n2, o1) {
    let ans;
    switch (o1) {
        case '+':
            ans = add(n1, n2);
            break;
        case '-':
            ans = subtract(n1, n2);
            break;
        case 'x':
            ans = multiply(n1, n2);
            break;
        case '÷':
            ans = divide(n1, n2);
            break;
        default:
            ans = Infinity;
            break;
    }
    return ans;
}
exports.calculation = calculation;
/**
 * Generates a random number within a specified range.
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (exclusive).
 * @returns A random number within the specified range.
 */
function randomNumber(min, max) {
    const span = max - min;
    const random = Math.floor(Math.random() * span) + min;
    return random;
}
exports.randomNumber = randomNumber;
// Function to select a random operator from an array
// export function randOp(arr = operators) {
//   let l = arr.length;
//   let r = Math.floor(Math.random() * l);
//   return arr[r];
// }
/**
 * Shuffles the elements of an array in place.
 * @param array - The array to be shuffled.
 * @returns The input array with its elements randomly rearranged.
 * @template T - The type of elements in the array.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}
exports.shuffle = shuffle;
/**
 * Generates an array of options for a mathematical calculation.
 * @param n1 - The first operand.
 * @param n2 - The second operand.
 * @param o1 - The operator for the calculation.
 * @returns An array of options that includes the correct answer and three other random numbers.
 */
function createOptions(n1, n2, o1) {
    var options = [];
    let r1, r2, r3;
    const ans = calculation(n1, n2, o1);
    options.push(ans);
    do {
        r1 = randomNumber(0, ans + 5);
    } while (options.includes(r1));
    options.push(r1);
    do {
        r2 = randomNumber(0, ans + 5);
    } while (options.includes(r2));
    options.push(r2);
    do {
        r3 = randomNumber(0, ans + 5);
    } while (options.includes(r3));
    options.push(r3);
    options = shuffle(options);
    return options;
}
exports.createOptions = createOptions;
////////////////////////////ASYNC Utility
//
//
/**
 * Delays the execution by the specified time.
 * @param time - The time to wait in milliseconds.
 * @returns A Promise that resolves after the specified delay.
 * @template T - The type of the resolved value (optional).
 */
// Function to delay execution for a specified time
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
exports.delay = delay;
////////////////////////////DOM Manipulation Methods
//
//
/**
 * Loads a specific section by showing and hiding elements in the DOM.
 * @param sectionName - The name of the section to be loaded.
 */
function loadSection(sectionName) {
    // Hide all sections
    var sections = document.querySelectorAll('#main-container > div');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    // Show the selected section
    var section = document.getElementById(sectionName + '-container');
    if (section) {
        section.style.display = 'flex';
        // Special handling for the "menu" section to display it as a grid
        if (sectionName == "menu") {
            section.style.display = 'grid';
        }
    }
}
exports.loadSection = loadSection;
/**
 * Disables the specified input element by setting the "disabled" attribute to "true".
 * @param element - The input element to be disabled.
 */
// Function to disable an input element
function disableInput(element) {
    element.setAttribute("disabled", "true");
}
exports.disableInput = disableInput;
/**
 * Enables and Focuses on the specified input element by removing the "disabled" attribute and focusing on the element
 * @param element - The input element to be enabled and focused.
 */
function enableInput(element) {
    element.removeAttribute("disabled");
    element.focus();
}
exports.enableInput = enableInput;
/**
 * Resets the text content of a div element to a calculated value based on the provided level.
 * @param element - The div element to reset.
 * @param level - The level used to calculate the new value.
 */
// Function to reset a number element to zero
function resetNumber(element, level) {
    const resetLevel = (level - 1) * 10;
    const resetToNumberAsString = String(resetLevel);
    element.textContent = resetToNumberAsString;
}
exports.resetNumber = resetNumber;
/**
 * Resets the text content of a div element to "1".
 * @param element - The div element to reset.
 */
function resetLevelNumber(element) {
    // Set the text content of the div element to "1"
    element.textContent = "1";
}
exports.resetLevelNumber = resetLevelNumber;
/**
 * Resets the width of elements in an array to "0px".
 * @param elementsArr - An array of div elements to reset the width.
 */
function resetWidth(elementsArr) {
    // Loop through each element in the array and set its width to "0px"
    for (let el of elementsArr) {
        el.style.width = "0px";
    }
}
exports.resetWidth = resetWidth;
/**
 * Resets the value of answer input elements to an empty string.
 * @param elementsArray - An array of input elements to reset the value.
 */
function resetAnswerInput(elementsArray) {
    // Loop through each element in the array and set its value to an empty string
    for (let el of elementsArray) {
        el.value = "";
    }
}
exports.resetAnswerInput = resetAnswerInput;
/**
 * Toggles the visibility of an element with a timed delay.
 * @param bool - A boolean indicating whether to make the element visible or hidden.
 * @param element - The div element to toggle visibility.
 * @param time - The time delay (in milliseconds) before hiding the element.
 */
function visibilityTimedToggle(bool, element, time) {
    // If bool is true, make the element visible and set a timeout to hide it after the specified time
    if (bool) {
        element.style.visibility = "visible";
        setTimeout(() => {
            element.style.visibility = "hidden";
        }, time);
    }
    // If bool is false,  hide the element
    if (!bool) {
        element.style.visibility = "hidden";
    }
}
exports.visibilityTimedToggle = visibilityTimedToggle;
/**
 *
 * @param bool Boolean indicating whether to make Element Visibile or hidden
 * @param element The Element to toggle visibility
 */
/**
 * Toggles the visibility of an element based on a boolean value.
 * @param bool - A boolean indicating whether to make the element visible or hidden.
 * @param element - The div element to toggle visibility.
 */
function visibilityToggle(bool, element) {
    // If bool is true, make the element visible; otherwise, hide it
    if (bool) {
        element.style.visibility = "visible";
    }
    else {
        element.style.visibility = "hidden";
    }
}
exports.visibilityToggle = visibilityToggle;
/**
 * Shows or hides specified elements by adjusting their display property.
 * @param elementsShow - An array of elements to be shown (display: flex).
 * @param elementsHide - An array of elements to be hidden (display: none).
 */
function showHide(elementsShow = [], elementsHide = []) {
    // Show elements in the elementsShow array
    if (elementsShow.length > 0) {
        elementsShow.forEach((el) => {
            el.style.display = "flex";
        });
    }
    // Hide elements in the elementsHide array
    if (elementsHide.length > 0) {
        elementsHide.forEach((el) => {
            el.style.display = "none";
        });
    }
}
exports.showHide = showHide;
/**
 * Toggles the "active-subject" class on the target element if it exists.
 * @param e - The event object representing the click event.
 */
function toggleActivate(e) {
    // Check if e.target exists before toggling the class
    if (e.target instanceof Element) {
        // Toggle the "active-subject" class on the target element
        e.target.classList.toggle("active-subject");
    }
    else {
        console.error("Event target is not an element.");
    }
}
exports.toggleActivate = toggleActivate;
////////////////////////////ANIMATION/STYLING Methods
//
//
/**
 * Emphasizes an element by applying a scaling effect with animation.
 * @param element - The element to be emphasized.
 * @param transitionTime - The duration of the scaling animation transition in milliseconds (default: 100).
 * @param scale - The scale factor for the element during emphasis (default: 1.3).
 * @param scaleTime - The duration for the element to stay at the emphasized scale before resetting (default: 250).
 */
function emphasize(element, transitionTime = 100, scale = 1.3, scaleTime = 250) {
    // Get the existing transform style of the element
    let existingTransform = getStyle(element, "transform") || "";
    // Apply a transition to the element to animate the scaling effect
    element.style.transition = `transform ${transitionTime}ms ease-in`;
    element.style.transform = existingTransform + " scale(1.1)";
    // Set a timeout to update the element's transform to the specified scale after a short delay
    setTimeout(() => (element.style.transform = existingTransform + ` scale(${scale})`), 50);
    // Set a timeout to reset the element's transform back to the original scale after the specified scale time
    setTimeout(() => (element.style.transform = existingTransform + " scale(1)"), scaleTime);
}
exports.emphasize = emphasize;
/**
 * Animates an element to indicate a correct state.
 * @param element - The element to be animated.
 */
function animateCorrect(element) {
    // Set the background and border color to indicate a correct state
    element.style.background = "#4caf50";
    element.style.borderColor = "white";
    // Set a timeout to reset the element's background and border color after a certain duration
    setTimeout(() => {
        element.style.background = "rgb(200 200 200 / 95%)";
        element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
}
exports.animateCorrect = animateCorrect;
/**
 * Animates an element to indicate an incorrect state.
 * @param element - The element to be animated.
 */
function animateIncorrect(element) {
    // Set the background and border color to indicate an incorrect state
    element.style.background = "#f44336";
    element.style.borderColor = "white";
    // Set a timeout to reset the element's background and border color after a certain duration
    setTimeout(() => {
        element.style.background = "rgb(200 200 200 / 95%)";
        element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
}
exports.animateIncorrect = animateIncorrect;
/**
 * Adds and removes a CSS class to create an incorrect motion effect.
 * @param element - The element to apply the motion effect.
 */
function incorrectMotion(element) {
    // Add a CSS class to create an incorrect motion effect
    element.classList.add("incorrect");
    // Set a timeout to remove the CSS class after a certain duration
    setTimeout(() => {
        element.classList.remove("incorrect");
    }, 500);
}
exports.incorrectMotion = incorrectMotion;
/**
 * Gets the computed style of a given element for a specific style property.
 * @param el - The element for which to get the style.
 * @param styleProp - The style property to retrieve.
 * @returns The computed style value of the specified style property.
 */
function getStyle(el, styleProp) {
    var defaultView = (el.ownerDocument || document).defaultView;
    if (defaultView && defaultView.getComputedStyle) {
        // Use defaultView.getComputedStyle method for modern browsers
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }
    else {
        // Fallback for older versions of IE (may not be accurate in all cases)
        return el.style[styleProp] || '';
    }
}
exports.getStyle = getStyle;
/**
 * Updates the correctness view based on a boolean value.
 * @param bool - A boolean value indicating correctness.
 * @param element - The HTML element representing the correctness view.
 */
function correctnessView(bool, element) {
    // Show or hide the element
    showHide([element], []);
    if (bool) {
        // Set the element's class and text content for a correct answer
        element.classList.add("correct-answer");
        element.classList.remove("incorrect-answer");
        element.textContent = "Correct";
    }
    else {
        // Set the element's class and text content for an incorrect answer
        element.classList.remove("correct-answer");
        element.classList.add("incorrect-answer");
        element.textContent = "Incorrect";
    }
}
exports.correctnessView = correctnessView;
/**
 * Converts a string to an array by removing commas.
 * @param inputString - The input string to be converted.
 * @returns An array of characters without commas.
 */
function convertStringToArray(inputString) {
    // Remove all commas from the input string
    const stringWithoutCommas = inputString.replace(/,/g, '');
    // Create an array with each character in the modified string
    const characterArray = stringWithoutCommas.split('');
    return characterArray;
}
exports.convertStringToArray = convertStringToArray;
/**
 * Changes the view by sliding elements to the left.
 * @param element1 - The first HTML element.
 * @param element2 - The second HTML element.
 */
function changeViewLeft(element1, element2) {
    element1.style.left = '0';
    element2.style.left = '100%';
    element1.style.opacity = '1';
    element2.style.opacity = '0';
}
exports.changeViewLeft = changeViewLeft;
/**
 * Changes the view by sliding elements to the right.
 * @param element1 - The first HTML element.
 * @param element2 - The second HTML element.
 */
function changeViewRight(element1, element2) {
    element1.style.left = '-100%';
    element2.style.left = '0';
    element1.style.opacity = '0';
    element2.style.opacity = '1';
}
exports.changeViewRight = changeViewRight;
/**
 * Creates activity text and icon classes based on the provided activity type.
 * @param type - The type of the activity.
 * @returns An array containing activity text and icon classes.
 */
function createActivityTextAndIcon(type) {
    let activityText, activityIconClass;
    switch (type) {
        case "multiple-choice-quiz":
            activityText = "Mulitple Choice Quiz";
            activityIconClass = "mc-quiz-icon icon fas fa-list-ol fa-large";
            break;
        case "quiz":
            activityText = "Pop Quiz";
            activityIconClass = "pen-icon icon fas fa-arrow-up-1-9 fa-large";
            break;
        case "game":
            activityText = "High Score Challenge";
            activityIconClass = "game-icon icon fas fa-crown fa-large";
            break;
        case "flash":
            activityText = "Flash Cards";
            activityIconClass = "flash-icon icon fas fa-bolt fa-large";
            break;
        case "multiple-choice":
            activityText = "Mulitple Choice Practice";
            activityIconClass = "mc-icon icon fas fa-table-cells-large fa-large";
            break;
        default:
            activityIconClass = " a ";
            activityText = type;
            break;
    }
    return [activityText, activityIconClass];
}
/**
 * Creates operator text and color text based on the provided activity type.
 * @param op - The type of the operator.
 * @returns An array containing operator text and operator color.
 */
function createOperatorTextAndIcon(op) {
    let operatorText, operatorColor;
    switch (op) {
        case "+":
            operatorText = "Addition";
            // operatorIconClass = "plus-icon icon fas fa-plus fa-large";
            operatorColor = "#6ee06e";
            break;
        case "-":
            operatorText = "Subtraction";
            // operatorIconClass = "minus-icon icon fas fa-minus fa-large";
            operatorColor = "#00bdff";
            break;
        case "x":
            operatorText = "Multiplication";
            // operatorIconClass = "times-icon icon fas fa-times fa-large";
            operatorColor = "#f5ba42";
            break;
        case "÷":
            operatorText = "Division";
            // operatorIconClass = "divide-icon icon fas fa-divide fa-large";
            operatorColor = "#e46fe4";
            break;
        default:
            // operatorIconClass = "  ";
            operatorText = "You Can Do It!";
            operatorColor = "#f3e6aa";
            break;
    }
    return [operatorText, operatorColor];
}
/**
 * Creates diffictulty text and difficulty color based on difficulty level.
 * @param diff - The level of difficulty.
 * @returns An array containing difficulty converted to verbose text and color schema for difficulty.
 */
function createDifficultyText(diff) {
    let difficultyText, difficultyColor;
    switch (String(diff)) {
        case "1":
            difficultyText = "Easy";
            difficultyColor = "green";
            break;
        case "2":
            difficultyText = "Novice";
            difficultyColor = "yellow";
            break;
        case "3":
            difficultyText = "Intermediate";
            difficultyColor = "orange";
            break;
        case "4":
            difficultyText = "Advanced";
            difficultyColor = "red";
            break;
        case "5":
            difficultyText = "Genius!";
            difficultyColor = "purple";
            break;
        default:
            difficultyText = "Good Luck!";
            difficultyColor = "#f3e6aa";
            break;
    }
    return [difficultyText, difficultyColor];
}
exports.createDifficultyText = createDifficultyText;
/**
 * Updates the selected activity in the user interface based on the provided activity type.
 * @param type - The type of the activity to be selected.
 */
function updateActivitySelected(type) {
    // Get elements by their IDs
    const activityElOp = document.getElementById("selected-activity-menu-op");
    const activityElDiff = document.getElementById("selected-activity-menu-diff");
    let iconElementOp = document.getElementById("selected-activity-icon-op");
    let iconElementDiff = document.getElementById("selected-activity-icon-diff");
    // Constants for class names
    // Get activity text and icon classes based on the provided type
    const [activityText, activityIconClass] = createActivityTextAndIcon(type);
    // Split icon classes and update the icon elements
    const activityClasses = activityIconClass.split(" ");
    if (iconElementOp instanceof HTMLElement)
        iconElementOp.classList.remove(...iconElementOp.classList);
    if (iconElementDiff instanceof HTMLElement)
        iconElementDiff.classList.remove(...iconElementDiff.classList);
    for (let c of activityClasses) {
        if (iconElementOp instanceof HTMLElement)
            iconElementOp.classList.add(c);
        if (iconElementDiff instanceof HTMLElement)
            iconElementDiff.classList.add(c);
    }
    if (activityElOp instanceof HTMLElement)
        activityElOp.innerHTML = activityText;
    if (activityElDiff instanceof HTMLElement)
        activityElDiff.innerHTML = activityText;
}
exports.updateActivitySelected = updateActivitySelected;
/**
 * Updates the selected operator in the user interface based on the provided operator.
 * @param op - The selected operator.
 */
function updateOperatorSelected(op) {
    const operator = document.getElementById("selected-operator-menu");
    const [operatorText, operatorColor, operatorIconClass] = createOperatorTextAndIcon(op);
    const operatorContainer = document.getElementById("selected-operator-container-menu");
    if (operatorContainer) {
        operatorContainer.style.border = "3px solid " + operatorColor;
    }
    if (operator) {
        operator.textContent = operatorText;
    }
    // Uncomment the following lines if you want to include an icon
    // const iconElement: HTMLElement | null = document.getElementById("selected-operator-icon");
    // if (iconElement) {
    //   const iconClasses: string[] = operatorIconClass.split(" ");
    //   iconElement.classList = "";
    //   iconClasses.forEach((c: string) => iconElement.classList.add(c));
    // }
}
exports.updateOperatorSelected = updateOperatorSelected;
/**
 * Updates the selected operator and difficulty in the general settings based on the provided operator and difficulty.
 * @param op - The selected operator.
 * @param diff - The selected difficulty.
 */
function updateGeneralSelected(op, diff) {
    const difficulty = document.getElementById("selected-difficulty-general");
    const difficultyContainer = document.getElementById("selected-difficulty-container-general");
    const operator = document.getElementById("selected-operator-text-general");
    const operatorContainer = document.getElementById("selected-operator-container-general");
    const [operatorText, operatorColor] = createOperatorTextAndIcon(op);
    const [diffText, diffColor] = createDifficultyText(diff);
    if (operatorContainer) {
        operatorContainer.style.border = "3px solid " + operatorColor;
    }
    if (difficultyContainer) {
        difficultyContainer.style.border = "3px solid " + diffColor;
    }
    if (difficulty) {
        difficulty.textContent = diffText;
    }
    if (operator) {
        operator.textContent = operatorText;
    }
}
exports.updateGeneralSelected = updateGeneralSelected;
/**
 * Asynchronously updates the visual representation of the selected level in the general settings.
 * @param level - The selected level.
 */
function updateLevelVisuals(level) {
    return __awaiter(this, void 0, void 0, function* () {
        const [difficultyText, difficultyColor] = createDifficultyText(String(level));
        const difficulty = document.getElementById("selected-difficulty-general");
        const difficultyContainer = document.getElementById("selected-difficulty-container-general");
        if (difficultyContainer) {
            difficultyContainer.style.border = "3px solid " + difficultyColor;
        }
        if (difficulty) {
            difficulty.textContent = difficultyText;
        }
    });
}
exports.updateLevelVisuals = updateLevelVisuals;
/**
 * Sets the high and low values based on the selected difficulty and operator.
 * @param difficulty - The selected difficulty.
 * @param operator - The selected operator.
 * @returns An array containing the high and low values.
 */
function setHighLowVals(difficulty, operator) {
    let highVal;
    let lowVal;
    operator = String(operator).trim();
    console.log("sethighVal op:", operator);
    if (operator === "x") {
        switch (difficulty) {
            case 1:
                highVal = 5;
                lowVal = 0;
                break;
            case 2:
                highVal = 6;
                lowVal = 2;
                break;
            case 3:
                highVal = 8;
                lowVal = 3;
                break;
            case 4:
                highVal = 10;
                lowVal = 3;
                break;
            case 5:
                highVal = 12;
                lowVal = 4;
                break;
            default:
                highVal = 0;
                lowVal = 0;
                break;
        }
    }
    else if (operator === "+") {
        switch (difficulty) {
            case 1:
                highVal = 5;
                lowVal = 0;
                break;
            case 2:
                highVal = 10;
                lowVal = 0;
                break;
            case 3:
                highVal = 20;
                lowVal = 0;
                break;
            case 4:
                highVal = 32;
                lowVal = 0;
                break;
            case 5:
                highVal = 50;
                lowVal = 0;
                break;
            default:
                highVal = 0;
                lowVal = 0;
                break;
        }
    }
    else if (operator === "-") {
        switch (difficulty) {
            case 1:
                highVal = 9;
                lowVal = 0;
                break;
            case 2:
                highVal = 20;
                lowVal = 0;
                break;
            case 3:
                highVal = 40;
                lowVal = 0;
                break;
            case 4:
                highVal = 70;
                lowVal = 0;
                break;
            case 5:
                highVal = 100;
                lowVal = 0;
                break;
            default:
                highVal = 0;
                lowVal = 0;
                break;
        }
    }
    else {
        switch (difficulty) {
            case 1:
                highVal = 1;
                lowVal = 0;
                break;
            case 2:
                highVal = 3;
                lowVal = 1;
                break;
            case 3:
                highVal = 4;
                lowVal = 2;
                break;
            case 4:
                highVal = 9;
                lowVal = 3;
                break;
            case 5:
                highVal = 12;
                lowVal = 3;
                break;
            default:
                highVal = 0;
                lowVal = 0;
                break;
        }
    }
    const vals = [highVal, lowVal];
    return vals;
}
exports.setHighLowVals = setHighLowVals;
function updateDifficultyRange(operator) {
    // let  highVal, lowVal;
    let difficulty = sessionStorage.getItem("activeDifficulty");
    let activeOperator = sessionStorage.getItem("activeOperators");
    // Set the high and low values based on the current active difficulty level
    const difficultyNumber = Number(difficulty);
    const [highVal, lowVal] = setHighLowVals(difficultyNumber, activeOperator);
    sessionStorage.setItem("activeHighVal", String(highVal));
    sessionStorage.setItem("activeLowVal", String(lowVal));
    // Set the active high value based on the current active difficulty level
    // let highValue = (i) * 10;
    // state.activeHighVal = highValue
}
exports.updateDifficultyRange = updateDifficultyRange;
/**
 * Reformats the operator string for better readability.
 * @param operator - The operator to be reformatted.
 * @returns The reformatted operator string.
 */
function reformatOperator(operator) {
    let reformattedOperator;
    switch (String(operator).trim()) {
        case "+":
            reformattedOperator = "addition";
            break;
        case "-":
            reformattedOperator = "subtraction";
            break;
        case "x":
            reformattedOperator = "multiplication";
            break;
        case "÷":
            reformattedOperator = "division";
            break;
        default:
            reformattedOperator = operator;
            console.log("Error: Operator not reformatted");
            break;
    }
    return reformattedOperator;
}
exports.reformatOperator = reformatOperator;
