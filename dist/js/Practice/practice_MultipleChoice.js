import*as utilMethods from"../utils.js";import{state}from"../state.js";import*as questionLogic from"../sharedQuestionLogic.js";import{mcOptions}from"../domElements.js";async function mcAnswerCheck(t,e,o=null){var i=sessionStorage.getItem("activeOperators");t||utilMethods.animateIncorrect(o),utilMethods.animateCorrect(e),await utilMethods.delay(250),questionLogic.newQuestion("multiple-choice",i,mcCreateOptions)}function mcCreateOptions(t,e,o){var i=utilMethods.createOptions(t,e,o);mcOptions.innerHTML="";let n=utilMethods.calculation(t,e,o);i.forEach((t,e)=>{var o=document.createElement("button");o.classList.add("option"),o.textContent=t;let i;t==n&&(i=o),o.addEventListener("mousedown",function(t){t=t.target;t.textContent==n&&mcAnswerCheck(!0,t),t.textContent!=n&&mcAnswerCheck(!1,i,t)}),mcOptions.appendChild(o)})}window.onload=function(){var t=sessionStorage.getItem("activeOperators"),e=sessionStorage.getItem("activeDifficulty");utilMethods.updateGeneralSelected(t,e),questionLogic.newQuestion("multiple-choice",t,mcCreateOptions)};export{mcCreateOptions};