import*as utilMethods from"../utils.js";import{state}from"../state.js";import*as questionLogic from"../sharedQuestionLogic.js";import{updateBadgeStatus,retrieveBadges,getHighestBadge}from"../badges.js";import{animateBadge}from"../badgeEarned.js";import{gameCorrectness,gameNumOne,gameNumTwo,gameOpOne,gameActual,gameActualContainer,gameAnswerInput,gameAnswerSubmit,gameCurrScore,gameHighScore,gameLevelNumber,gameTracker,gameTrackerContainer,gameTrackerContainer2}from"../domElements.js";async function gameAnswerCheck(e){var t=sessionStorage.getItem("activeDifficulty"),a=sessionStorage.getItem("activeOperators");utilMethods.updateDifficultyRange(a),e?(utilMethods.correctnessView(!0,gameCorrectness),utilMethods.emphasize(gameCorrectness),utilMethods.visibilityTimedToggle(!1,gameActualContainer,1e3),updateScore(),utilMethods.disableInput(gameAnswerInput),await updateLevel(),await utilMethods.delay(300),utilMethods.resetAnswerInput([gameAnswerInput]),utilMethods.enableInput(gameAnswerInput),questionLogic.newQuestion("game",a)):(utilMethods.correctnessView(!1,gameCorrectness),utilMethods.incorrectMotion(gameCorrectness),utilMethods.disableInput(gameAnswerInput),await utilMethods.delay(200),utilMethods.visibilityTimedToggle(!0,gameActualContainer,4e3),utilMethods.resetAnswerInput([gameAnswerInput]),utilMethods.resetNumber(gameCurrScore,t),utilMethods.resetWidth([gameTracker]),questionLogic.newQuestion("game",a),await utilMethods.delay(500),utilMethods.enableInput(gameAnswerInput))}function updateScore(){var e=parseInt(gameCurrScore.innerHTML);gameCurrScore.innerHTML=e+=1,checkHighScore()}function checkHighScore(){var e=gameCurrScore.innerHTML;50==e&&gameOverWin(),e>parseInt(state.high_score)?(state.high_score=e,gameHighScore.innerHTML=e):gameHighScore.innerHTML=state.high_score}function levelUp(e){gameTracker.style.backgroundColor=`hsl( ${30*e}, 100%, 50%)`}async function checkBadgeStatus(e,t,a){return!1===e[utilMethods.reformatOperator(t)].game[a]}async function updateLevel(){let e=parseInt(gameLevelNumber.textContent);var t,a,r,s;parseInt(gameCurrScore.textContent)%1==0&&updateProgress(gameCurrScore.textContent),parseInt(gameCurrScore.textContent)%10==0&&(t=Number(sessionStorage.getItem("activeDifficulty")),a=sessionStorage.getItem("activeOperators"),r=await retrieveBadges(),await utilMethods.updateLevelVisuals(s=5==t?5:t+1),sessionStorage.setItem("activeDifficulty",s),utilMethods.updateDifficultyRange(),await checkBadgeStatus(r,utilMethods.reformatOperator(a),t)&&(animateBadge(),await utilMethods.delay(200),s=document.getElementsByClassName("badge-img"),await updateBadgeStatus("game",t,a,!0),updateChallengeBadgeAppearance(s,await retrieveBadges(),a)),await utilMethods.delay(300),utilMethods.disableInput(gameAnswerInput),utilMethods.resetWidth([gameTracker]),levelUp(e+=1)),gameLevelNumber.textContent=e}async function updateProgress(e){console.log(e),e=10<e?e%10:e;let t=window.getComputedStyle(gameTrackerContainer).width,a=window.getComputedStyle(gameTrackerContainer).getPropertyValue("border-width"),r=(t=parseFloat(t.slice(0,-2)),a=parseFloat(a.slice(0,-2)),t-=2*a,window.getComputedStyle(gameTracker).width);r=parseFloat(r.slice(0,-2)),r=t/10*e,gameTracker.style.width=r+"px",r>=t&&(await utilMethods.delay(1e3),utilMethods.resetWidth([gameTracker]))}function gameUpdateAnswerHandler(e){e=e.target.value;state.userValue=e}function gameCheckAnswerHandler(e){var t=utilMethods.calculation(gameNumOne.innerHTML,gameNumTwo.innerHTML,gameOpOne.innerHTML);gameAnswerCheck((gameActual.innerHTML=t)==state.userValue),e.preventDefault()}function gameOverWin(){alert("You just beat the Challenge and got 50 questions correct! Great job! You're a Math Genius! Keep going to beat your high score!")}async function resetGameSettings(){var e=sessionStorage.getItem("activeOperators");utilMethods.disableInput(gameAnswerInput),await utilMethods.delay(500),utilMethods.resetAnswerInput([gameAnswerInput]),utilMethods.resetNumber(gameCurrScore,1),utilMethods.resetLevelNumber(gameLevelNumber),utilMethods.resetWidth([gameTracker]),sessionStorage.setItem("activeDifficulty",1),utilMethods.updateLevelVisuals(1),utilMethods.updateDifficultyRange(e),await utilMethods.updateGeneralSelected(e,difficulty),questionLogic.newQuestion("game",e),await utilMethods.delay(1200),utilMethods.enableInput(gameAnswerInput)}const startOverButton=document.getElementById("hsc-start-over");function updateChallengeBadgeAppearance(e,t,a){var r,s=utilMethods.reformatOperator(a),a=getHighestBadge(t);console.log("bestBadges",a);for(r of a)if(0!==r[2]&&r[0]==s&&"game"==r[1]){var i,n=r[2];for(i of e){i.getAttribute("data-badge-type");i.getAttribute("data-badge-number")<=n&&i.classList.add("active")}}}startOverButton.addEventListener("click",resetGameSettings),gameAnswerInput.addEventListener("input",gameUpdateAnswerHandler),gameAnswerSubmit.addEventListener("submit",gameCheckAnswerHandler),window.onload=async function(){var e=sessionStorage.getItem("activeOperators"),t=sessionStorage.getItem("activeDifficulty");updateChallengeBadgeAppearance(document.getElementsByClassName("badge-img"),await retrieveBadges(),e),utilMethods.resetNumber(gameCurrScore,t),await utilMethods.updateGeneralSelected(e,t),resetGameSettings()};