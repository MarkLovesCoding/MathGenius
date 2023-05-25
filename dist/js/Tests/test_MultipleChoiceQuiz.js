import*as utilMethods from"../utils.js";import{state}from"../state.js";import*as questionLogic from"../sharedQuestionLogic.js";import{updateBadgeStatus}from"../badges.js";import{animateBadge}from"../badgeEarned.js";import{mcQuizOptions}from"../domElements.js";function finishMCQuiz(){state.mcQuizActive.mcqNumAnswered=0,state.mcQuizActive.mcqNumCorrect=0,state.mcQuizActive.mcqFailedAttempts=0}const mcQuestionNumber=document.getElementById("mc-question-number"),mcQuestionsCorrect=document.getElementById("mc-questions-correct"),mcQuizModal=document.getElementById("mc-quiz-modal"),mcQuizAmountCorrect=document.getElementById("mc-quiz-amountCorrect"),mcQuizAmountCorrectPercentage=document.getElementById("mc-quiz-amountCorrectPercentage");async function mcQuizShowScore(){mcQuizAmountCorrect.textContent=state.mcQuizActive.mcqNumCorrect,mcQuizAmountCorrectPercentage.textContent=utilMethods.percentage(state.mcQuizActive.mcqNumCorrect,state.mcQuizActive.mcqNumAnswered).toString()+"%",mcQuizModal.style.visibility="visible",mcQuizModal.style.zIndex=101,utilMethods.emphasize(mcQuizModal),await utilMethods.delay(1600),mcQuizModal.style.visibility="hidden",mcQuizModal.style.zIndex=0}function updateMCQuizPage(){var t=state.mcQuizActive.mcqNumCorrect,e=(state.mcQuizActive.mcqNumQuestion,state.mcQuizActive.mcqNumAnswered);mcQuestionNumber.textContent=e,mcQuestionsCorrect.textContent=t}async function checkMCQAnswered(){var t;state.mcQuizActive.mcqNumAnswered==state.mcQuizActive.mcqNumQuestion&&(10==state.mcQuizActive.mcqNumCorrect?(t=sessionStorage.getItem("activeDifficulty"),await updateBadgeStatus("mcquiz",t,!0),await animateBadge()):mcQuizShowScore(),finishMCQuiz())}async function mcQuizAnswerCheck(t,e,i=null){t?(0===state.mcQuizActive.mcqFailedAttempts&&(state.mcQuizActive.mcqNumCorrect+=1,state.mcQuizActive.mcqNumAnswered+=1),0<state.mcQuizActive.mcqFailedAttempts&&(state.mcQuizActive.mcqNumAnswered+=1),state.mcQuizActive.mcqFailedAttempts=0,checkMCQAnswered()):(state.mcQuizActive.mcqFailedAttempts+=1,checkMCQAnswered(),utilMethods.animateIncorrect(i)),utilMethods.animateCorrect(e),await utilMethods.delay(150),updateMCQuizPage(),questionLogic.newQuestion("multiple-choice-quiz",state.activeOperators,mcQuizCreateOptions)}function mcQuizCreateOptions(t,e,i){var c=utilMethods.createOptions(t,e,i);mcQuizOptions.innerHTML="";let m=utilMethods.calculation(t,e,i);c.forEach((t,e)=>{var i=document.createElement("button");i.classList.add("option"),i.textContent=t;let c;t==m&&(c=i),i.addEventListener("mousedown",function(t){t=t.target;t.textContent==m&&mcQuizAnswerCheck(!0,t),t.textContent!=m&&mcQuizAnswerCheck(!1,c,t)}),mcQuizOptions.appendChild(i)})}window.onload=function(){console.log("Get:",sessionStorage.getItem("activeOperators"));var t=utilMethods.convertStringToArray(sessionStorage.getItem("activeOperators"));state.activeOperators=t,sessionStorage.setItem("activeOperators",t),questionLogic.newQuestion("multiple-choice-quiz",t,mcQuizCreateOptions)};export{mcQuizCreateOptions};