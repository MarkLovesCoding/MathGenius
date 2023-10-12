//////////////////////////// MATH Methods
//
//// Function to add two numbers
export function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

// Function to subtract two numbers
export function subtract(num1, num2) {
  return parseInt(num1) - parseInt(num2);
}

// Function to multiply two numbers
export function multiply(num1, num2) {
  return parseInt(num1) * parseInt(num2);
}

// Function to divide two numbers
export function divide(num1, num2) {
  return parseInt(num1) / parseInt(num2);
}

// Function to calculate the percentage of a number
export function percentage(n1, n2) {
  return Math.round(n1 / n2 * 100);
}

// Function to perform a calculation based on the operator
export function calculation(n1, n2, o1) {
  let ans;
  switch (o1) {
    case "+":
      ans = add(n1, n2);
      break;
    case "-":
      ans = subtract(n1, n2);
      break;
    case "x":
      ans = multiply(n1, n2);
      break;
    case "÷":
      ans = divide(n1, n2);
      break;
    default:
      break;
  }
  return ans;
}

// Function to generate a random number within a range
export function randomNumber(min, max) {
  let span = max - min;
  let rand = Math.floor(Math.random() * span) + min;
  return rand;
}

// Function to select a random operator from an array
export function randOp(arr = operators) {
  let l = arr.length;
  let r = Math.floor(Math.random() * l);
  return arr[r];
}

// Function to shuffle the elements in an array
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Function to create answer options for a calculation
export function createOptions(n1, n2, o1) {
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

////////////////////////////ASYNC Utility
//
//

// Function to delay execution for a specified time
export function delay(time) {
  return new Promise(res => {
    setTimeout(res, time);
  });
}

////////////////////////////DOM Manipulation Methods
//
//
// Function to load a specific section and hide others
export function loadSection(sectionName) {
  // Hide all sections
  var sections = document.querySelectorAll('#main-container > div');
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }

  // Show the selected section
  var section = document.getElementById(sectionName + '-container');
  section.style.display = 'flex';

  // Special handling for the "menu" section to display it as a grid
  if (sectionName == "menu") {
    section.style.display = 'grid';
  }
}

// Function to disable an input element
export function disableInput(element) {
  element.setAttribute("disabled", "true");
}

// Function to enable an input element and focus on it
export function enableInput(element) {
  element.removeAttribute("disabled");
  element.focus();
}

// Function to reset a number element to zero
export function resetNumberToZero(element) {
  element.textContent = 0;
}

// Function to reset the width of elements in an array
export function resetWidth(elementsArr) {
  for (let el of elementsArr) {
    el.style.width = "0px";
  }
}

// Function to reset the value of answer input elements
export function resetAnswerInput(elementsArray) {
  for (let el of elementsArray) {
    el.value = "";
  }
}

// Function to toggle visibility of an element with a timed delay
export function visibilityTimedToggle(bool, element, time) {
  if (bool) {
    element.style.visibility = "visible";
    setTimeout(() => {
      element.style.visibility = "hidden";
    }, time);
  }
  if (!bool) {
    element.style.visibility = "hidden";
  }
}

// Function to toggle visibility of an element
export function visibilityToggle(bool, element) {
  if (bool) {
    element.style.visibility = "visible";
  }
  if (!bool) {
    element.style.visibility = "hidden";
  }
}

// Function to show or hide multiple elements
export function showHide(elementsShow = [], elementsHide = []) {
  if (elementsShow.length > 0) {
    elementsShow.forEach(el => {
      el.style.display = "flex";
    });
  }
  if (elementsHide.length > 0) {
    elementsHide.forEach(el => {
      el.style.display = "none";
    });
  }
}

// Function to toggle the "active-subject" class on a target element
export function toggleActivate(e) {
  e.target.classList.toggle("active-subject");
}

////////////////////////////ANIMATION/STYLING Methods
//
//

// Function to emphasize an element with a scaling effect
export function emphasize(element, transitionTime = 100, scale = 1.3, scaleTime = 250) {
  // Parse input values to ensure they are of the correct type
  scaleTime = parseInt(scaleTime);
  scale = parseFloat(scale);
  transitionTime = parseInt(transitionTime);

  // Get the existing transform style of the element
  let existingTransform = getStyle(element, "transform") || "";

  // Apply a transition to the element to animate the scaling effect
  element.style.transition = `transform ${transitionTime}ms ease-in`;
  element.style.transform = existingTransform + " scale(1.1)";

  // Set a timeout to update the element's transform to the specified scale after a short delay
  setTimeout(() => element.style.transform = existingTransform + ` scale(${scale})`, 50);

  // Set a timeout to reset the element's transform back to the original scale after the specified scale time
  setTimeout(() => element.style.transform = existingTransform + " scale(1)", scaleTime);
}

// Function to animate an element with a correct state feedback
export function animateCorrect(element) {
  element.style.background = "#4caf50";
  element.style.borderColor = "white";

  // Set a timeout to reset the element's background and border color after a certain duration
  setTimeout(() => {
    element.style.background = "rgb(200 200 200 / 95%)";
    element.style.borderColor = "rgba(100,100,100,1)";
  }, 700);
}

// Function to animate an element with an incorrect state feedback
export function animateIncorrect(element) {
  element.style.background = "#f44336";
  element.style.borderColor = "white";

  // Set a timeout to reset the element's background and border color after a certain duration
  setTimeout(() => {
    element.style.background = "rgb(200 200 200 / 95%)";
    element.style.borderColor = "rgba(100,100,100,1)";
  }, 700);
}

// Function to add and remove a CSS class for incorrect motion effect
export function incorrectMotion(element) {
  element.classList.add("incorrect");

  // Set a timeout to remove the CSS class after a certain duration
  setTimeout(() => {
    element.classList.remove("incorrect");
  }, 500);
}

// Function to get the computed style of an element
export function getStyle(el, styleProp) {
  var value,
    defaultView = (el.ownerDocument || document).defaultView;
  if (defaultView && defaultView.getComputedStyle) {
    // Get the computed style using the defaultView.getComputedStyle method
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    // Get the computed style using the el.currentStyle property (for older versions of IE)
    styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];

    // Convert certain numeric values to pixel values for consistency
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return function (value) {
        var oldLeft = el.style.left,
          oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      }(value);
    }
    return value;
  }
}

// Function to update the correctness view based on a boolean value
export function correctnessView(bool, element) {
  // Show or hide the element
  showHide([element], []);
  if (bool) {
    // Set the element's class and text content for a correct answer
    element.classList.add("correct-answer");
    element.classList.remove("incorrect-answer");
    element.textContent = "Correct";
  } else {
    // Set the element's class and text content for an incorrect answer
    element.classList.remove("correct-answer");
    element.classList.add("incorrect-answer");
    element.textContent = "Incorrect";
  }
}

// Function to convert a string to an array by removing commas
export function convertStringToArray(inputString) {
  // Remove all commas from the input string
  const stringWithoutCommas = inputString.replace(/,/g, '');

  // Create an array with each character in the modified string
  const characterArray = stringWithoutCommas.split('');
  return characterArray;
}

// Function to change the view by sliding elements to the left
export function changeViewLeft(element1, element2) {
  element1.style.left = 0;
  element2.style.left = "100%";
  element1.style.opacity = 1;
  element2.style.opacity = 0;
}

// Function to change the view by sliding elements to the right
export function changeViewRight(element1, element2) {
  element1.style.left = "-100%";
  element2.style.left = 0;
  element1.style.opacity = 0;
  element2.style.opacity = 1;
}