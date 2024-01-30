import * as utilMethods from '../utils.js';
window.onload = function () {
    //default
    sessionStorage.setItem("activeDifficulty", "1");
    // Function to update the difficulty range based on the current active difficulty level
    const operatorTestMenuBackwardLower = document.getElementById("operator-test-menu-backward-lower");
    const difficultyMenuForward = document.getElementById("difficulty-menu-forward");
    const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower");
    const activitiesChoices = document.querySelectorAll(".activity-choice");
    const realChoices = document.querySelectorAll(".real-choice");
    const operatorContainer = document.getElementById("operator-menu-container");
    const activityContainer = document.getElementById("real-menu-container");
    const difficultyContainer = document.getElementById("difficulty-menu-container");
    const operatorChoices = document.querySelectorAll(".operator-choice");
    const rangeInput = document.getElementById("range-input");
    const rangeValue = document.getElementById("range-value");
    const levelText = document.getElementById("level-text");
    operatorTestMenuBackwardLower.addEventListener("click", () => {
        utilMethods.changeViewLeft(activityContainer, operatorContainer);
    });
    // }
    // Handle the click event on the difficultyMenuBackwards button
    // for (let el of difficultyMenuBackwards) {
    difficultyMenuBackwardLower.addEventListener("click", () => {
        utilMethods.changeViewLeft(operatorContainer, difficultyContainer);
    });
    // }
    // Handle the click event on the difficultyMenuForward button
    difficultyMenuForward.addEventListener("click", () => {
        // Update the difficulty range based on the user's selection
        utilMethods.updateDifficultyRange();
        // Generate a new question based on the chosen activity and active operators
        if (sessionStorage.getItem("activity") === "multiple-choice-quiz") {
            window.location.href = "/multiple-choice-quiz";
        }
        else if (sessionStorage.getItem("activity") === "game") {
            window.location.href = "/high-score-challenge";
        }
        else if (sessionStorage.getItem("activity") === "quiz") {
            window.location.href = "pop-quiz";
        }
    });
    // A function to add event listeners for activity types (real/practice)
    function addEventsForTypesOrActivities(activitiesChoices) {
        for (let activity of activitiesChoices) {
            activity.addEventListener("click", () => {
                activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"));
                // Determine which activity type was selected by looking at the "data-type" attribute
                activity.classList.add("activity-selected");
            });
        }
    }
    // A function to add event listeners for operators (+, -, x, ÷)
    function addEventsForOperators(operatorsChoices) {
        for (let operator of operatorsChoices) {
            operator.addEventListener("click", () => {
                operatorsChoices.forEach(operator => operator.classList.remove("active-operator"));
                // Determine which activity was selected by looking at the "data-type" attribute
                operator.classList.add("active-operator");
                let updatedOperator = updateOperator(operatorChoices);
                if (updatedOperator) {
                    sessionStorage.setItem("activeOperators", updatedOperator);
                }
                else
                    throw new Error("Session Storage for Operator not Set");
                let activity = sessionStorage.getItem("activity");
                utilMethods.updateOperatorSelected(updatedOperator);
                if (activity == "game") {
                    sessionStorage.setItem("activeDifficulty", "1");
                    window.location.href = "/high-score-challenge";
                }
                else {
                    utilMethods.changeViewRight(operatorContainer, difficultyContainer);
                }
            });
        }
    }
    addEventsForTypesOrActivities(activitiesChoices);
    addEventsForTypesOrActivities(realChoices);
    addEventsForOperators(operatorChoices);
    function updateOperator(operatorChoices) {
        let operatorText = "+";
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
                sessionStorage.setItem("activeOperators", operatorText);
            }
        }
        // Return the array of active operators
        return operatorText;
    }
    // Initialize variables for the range input, range value, and level text elements
    const difficultyLevels = {
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
}; //close window.onload function
