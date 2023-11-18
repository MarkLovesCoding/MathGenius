import*as utilMethods from"../utils.js";import*as questionLogic from"../sharedQuestionLogic.js";import{mcOptions}from"../domElements.js";async function mcAnswerCheck(t,e,o=null){var i=sessionStorage.getItem("activeOperators");if(t){if(utilMethods.animateCorrect(e),await utilMethods.delay(250),!i)throw new Error("Error retrieving operator from session storage.");questionLogic.newQuestion("multiple-choice",i,mcCreateOptions)}else o&&utilMethods.animateIncorrect(o),await utilMethods.delay(250)}function mcCreateOptions(t,e,o){var i=utilMethods.createOptions(t,e,o);mcOptions.innerHTML="";let n=utilMethods.calculation(t,e,o);i.forEach(t=>{var e=document.createElement("button");e.classList.add("option"),e.textContent=t.toString();let o;t==n&&(o=e),e.addEventListener("mousedown",function(t){t=t.target;t.textContent==n.toString()&&mcAnswerCheck(!0,t),t.textContent!=n.toString()&&mcAnswerCheck(!1,o,t)}),mcOptions.appendChild(e)})}window.onload=function(){var t=sessionStorage.getItem("activeOperators"),e=sessionStorage.getItem("activeDifficulty");t&&e&&(utilMethods.updateGeneralSelected(t,e),questionLogic.newQuestion("multiple-choice",t,mcCreateOptions))};export{mcCreateOptions};