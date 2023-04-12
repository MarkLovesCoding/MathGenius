//TO DO

//BUGS to fix before refactor:

//burger shouldn't show up at first, or shoul dbe math symbls.
//figure out why animations won't work when the quiz animation works 10/10. possibly convcert to animation fram and toggle classnames

//features
//rename games and provide icons on buttons?

//add badges for each level, for each difficulty that quiz was passed.
//save to profile. create profile.

import * as utilMethods from './ulils.js';
import { burger, burgerContainer, mainContainer,  subjects, diffButtons } from './domElements.js'
import { flashAnswer, flashCard, flashNumOne, flashNumTwo, flashOpOne, newFlash, flashContainer } from './domElements.js';
import {  mcNumOne, mcNumTwo, mcOpOne, mcOptions, newMC } from './domElements.js';
import {  mcQuizNumOne, mcQuizNumTwo, mcQuizOpOne, mcQuizOptions, newMCQuiz } from './domElements.js';
import {  quizAmountCorrect, quizAmountCorrectPercentage, quizAnswerForm, quizAnswerInput, quizCorrectness, quizCurrQuestion, quizCurrScore, quizCurrScoreContainer, quizLastScore, quizLastScoreContainer, quizModal, quizNumOne, quizNumTwo, quizOpOne, newQuiz } from './domElements.js';
import {  gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, newGame, gameActual, gameActualContainer, gameAnswerInput, gameAnswerSubmit, gameCurrScore, gameHighScore, gameLevelNumber, gameTracker, gameTracker2, gameTrackerContainer, gameTrackerContainer2 } from './domElements.js';
import { state } from './state.js'
// import { flashHandler } from './flash.js';

window.onload = function () {  //Ensure DOM is loaded before functions


  ////////////////////////////////////////////////////////////
  //SHARED
  //


  function burgerUpdate() {
    if (burger.classList.contains("open")) {
      burger.classList.remove("open");
    }
    burgerContainer.style.display = "flex";
  }
  async function hideBurger(){
    await utilMethods.delay(400)
    burgerContainer.style.display = "none";
  }

  function newGeneralQuestion(opEl, n1El, n2El, operators, func) {

    let o1 = utilMethods.randOp(operators);

    let n1 = utilMethods.randomNumber(0, state.activeHighVal);
    let n2 = utilMethods.randomNumber(0, state.activeHighVal);
    console.log(n1, n2, o1)
    console.log(opEl)
    console.log(n1El);
    console.log(n2El);
    console.log(operators);
    if (o1 === "x") {
      console.log("activeMH:",state.activeMultiplyHighVal)
      n1 = utilMethods.randomNumber(state.activeMultiplyLowVal, state.activeMultiplyHighVal);
      console.log(n1);
      n2 = utilMethods.randomNumber(state.activeMultiplyLowVal, state.activeMultiplyHighVal);
      console.log(n2);
      console.log("CHECK")
    }
    if (o1 === "÷") {
      while (n1 % n2 != 0) {
        n1 = utilMethods.randomNumber(0, state.activeHighVal);
        n2 = utilMethods.randomNumber(1, state.activeHighVal);
      }
    }
    if (o1 === "-") {
      if (n2 > n1) {
        let t = n1;
        n1 = n2;
        n2 = t;
      }
    }

    n1El.textContent = n1;
    n2El.textContent = n2;
    opEl.textContent = o1;
    console.log(utilMethods.calculation(n1, n2, o1));
    if (func) func(n1, n2, o1);
  }

  function newQuestion(type, operators, options) {
    let num1, num2, op1;
    switch (type) {
      case "flash":
        utilMethods.loadSection("flash")

        num1 = flashNumOne;
        num2 = flashNumTwo;
        op1 = flashOpOne;
        break;
      case "multiple-choice":
        utilMethods.loadSection("mc")
        num1 = mcNumOne;
        num2 = mcNumTwo;
        op1 = mcOpOne;
        break;
        case "multiple-choice-quiz":
          utilMethods.loadSection("mc-quiz")
          num1 = mcQuizNumOne;
          num2 = mcQuizNumTwo;
          op1 = mcQuizOpOne;
          break;
      case "quiz":
        utilMethods.loadSection("quiz")

        num1 = quizNumOne;
        num2 = quizNumTwo;
        op1 = quizOpOne;
        break;
      case "game":
        utilMethods.loadSection("game")

        num1 = gameNumOne;
        num2 = gameNumTwo;
        op1 = gameOpOne;
        break;
      default:
        break;
    }

    burgerUpdate();
    newGeneralQuestion(op1, num1, num2, operators, options)
  }

  // function updateDifficulty() {
  //   let  highVal;
  //   for (let i = 0; i <= 4; i++) {
  //     if (diffButtons[i].classList.contains("active-difficulty")) {


  //       switch (i) {
  //         case 0:
  //           highVal = 3;
  //           break;
  //         case 1:
  //           highVal = 5;
  //           break;
  //         case 2:
  //           highVal = 7;
  //           break;
  //         case 3:
  //           highVal = 9;
  //           break;
  //         case 4:
  //           highVal = 12;
  //           break;
  //       }
  //       state.activeMultiplyHighVal = highVal
  //       state.activeHighVal = (i + 1) * 10;
  //       state.activeDifficulty = i
  //     }
  //   }
  // }
  function updateDifficultyRange(){
    console.log(state.activeDifficulty);

    let i = state.activeDifficulty, highVal, lowVal;
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
    state.activeMultiplyLowVal = lowVal;

    state.activeMultiplyHighVal = highVal
    state.activeHighVal = (i) * 10;
  }


  function showMainMenu() {
    utilMethods.loadSection("activity-menu")
    hideBurger()
    resetQuizProperty(state.quizStats);
    utilMethods.resetNumberToZero(gameLevelNumber);
    utilMethods.resetWidth([gameTracker, gameTracker2]);
  }


  //
  //
  //END SHARED
  ////////////////////////////////////////////////////////////





  ////////////////////////////////////////////////////////////
  //FLASH
  //


  //
  //END FLASH
  ////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////////////////
  //GAME
  //
  async function gameAnswerCheck(bool) {
    if (bool) {
      correctnessView(true, gameCorrectness);
      utilMethods.emphasize(gameCorrectness);
      utilMethods.visibilityTimedToggle(false, gameActualContainer,1000);
      updateScore();
      await updateLevel();
      utilMethods.disableInput(gameAnswerInput);
      await utilMethods.delay(700);
      utilMethods.enableInput(gameAnswerInput);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);
      newQuestion("game",state.activeOperators);
    } else {
      utilMethods.showHide([], [burgerContainer]);
      correctnessView(false, gameCorrectness);
      utilMethods.incorrectMotion(gameCorrectness);
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.visibilityTimedToggle(true, gameActualContainer,1000);
      await utilMethods.delay(700);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);

      utilMethods.resetNumberToZero(gameCurrScore);
      utilMethods.resetWidth([gameTracker]);
      newQuestion("game", state.activeOperators);
      await utilMethods.delay(1500);
      utilMethods.enableInput(gameAnswerInput);
    }
  }

  function updateScore() {
    let currScoreInner = parseInt(gameCurrScore.innerHTML);
    currScoreInner += 1;
    gameCurrScore.innerHTML = currScoreInner;
    checkHighScore();
  }

  function checkHighScore() {
    let curr = gameCurrScore.innerHTML;
    if (curr > parseInt(state.high_score)) {
      state.high_score = curr;
      gameHighScore.innerHTML = curr;
    } else {
      gameHighScore.innerHTML = state.high_score;
    }
  }

  function correctnessView(bool, element) {
    utilMethods.showHide([element], []);
    if (bool) {
      element.classList.add("correct-answer");
      element.classList.remove("incorrect-answer");
      element.textContent = "Correct";
    } else {
      element.classList.remove("correct-answer");
      element.classList.add("incorrect-answer");
      element.textContent = "Incorrect";
    }
  }

  function levelUp(level) {
    let newColor = `hsl( ${level * 30}, 100%, 50%)`;
    gameTracker.style.backgroundColor = newColor;
    gameTracker2.style.backgroundColor = newColor;
  }

  function addlevel() {
    let fullWidth = window.getComputedStyle(gameTrackerContainer2).width;
    let borderWidth = window
      .getComputedStyle(gameTrackerContainer2)
      .getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    let progressWidth = window.getComputedStyle(gameTracker2).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    gameTracker2.style.width = progressWidth + "px";
  }

  async function updateLevel() {
    let level = parseInt(gameLevelNumber.textContent);
    if (parseInt(gameCurrScore.textContent) % 1 == 0) {
      updateProgress();
    }
    if (parseInt(gameCurrScore.textContent) % 10 == 0) {
      console.log("reset");
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.resetWidth([gameTracker]);
      addlevel();
      level += 1;
      levelUp(level);
      await utilMethods.delay(1000);
      utilMethods.enableInput(gameAnswerInput);
    }
    gameLevelNumber.textContent = level;
  }

  async function updateProgress() {
    let fullWidth = window.getComputedStyle(gameTrackerContainer).width;
    let borderWidth = window
      .getComputedStyle(gameTrackerContainer)
      .getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    let progressWidth = window.getComputedStyle(gameTracker).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    gameTracker.style.width = progressWidth + "px";
    if (progressWidth == fullWidth) {
      await utilMethods.delay(1000);
      utilMethods.resetWidth([gameTracker]);
    }
  }


  //
  //END GAME
  ////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////////////////
  //MC
  //

  async function mcAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      newQuestion("multiple-choice",state.activeOperators,  mcCreateOptions);
    } else {
      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      newQuestion("multiple-choice",state.activeOperators, mcCreateOptions);

    }
  }


  function mcCreateOptions(n1, n2, o1) {
    let options = utilMethods.createOptions(n1,n2,o1)
    mcOptions.innerHTML = "";
    let ans = utilMethods.calculation(n1,n2,o1)
    options.forEach((option, index) => {
      const optionEl = document.createElement("button");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      let correctOption;

      if (option == ans) {
        correctOption = optionEl;
      }
      optionEl.addEventListener("mousedown", function (e) {
        let targetEl = e.target;
        if (targetEl.textContent == ans) {
          mcAnswerCheck(true, targetEl);
        }
        if (targetEl.textContent != ans) {
          mcAnswerCheck(false, correctOption, targetEl);
        }
      });
      mcOptions.appendChild(optionEl);
    });


  }


  //
  //END MC
  ////////////////////////////////////////////////////////////





  //////MCQUIZ
  ///
  function finishMCQuiz(){
    //do action
    const numCorrect = state.mcQuizActive.mcqNumCorrect;
    const numQuestion = state.mcQuizActive.mcqNumQuestion;
    // const numCorrect = state.mcQuizActive.mcqNumCorrect;

    console.log(state.mcQuizActive)
    console.log("You answered: ", numCorrect, " questions correctly out of", numQuestion, ". That is " ,Math.round(100 * numCorrect / numQuestion), "%.")
    // alert("You answered: ", numCorrect, " questions correctly out of", numQuestion, ". That is " ,Math.round(100 * numCorrect / numQuestion), "%.")
    state.mcQuizActive.mcqNumAnswered = 0;
    state.mcQuizActive.mcqNumCorrect = 0;
    state.mcQuizActive.mcqFailedAttempts = 0;
  }
  const mcQuestionNumber = document.getElementById("mc-question-number")
  const mcQuestionsCorrect = document.getElementById("mc-questions-correct")
  const mcQuizModal = document.getElementById("mc-quiz-modal")

 const mcQuizAmountCorrect = document.getElementById("mc-quiz-amountCorrect");
 const mcQuizAmountCorrectPercentage = document.getElementById("mc-quiz-amountCorrectPercentage");

 async function mcQuizShowScore() {
  mcQuizAmountCorrect.textContent = state.mcQuizActive.mcqNumCorrect;
  mcQuizAmountCorrectPercentage.textContent = utilMethods.percentage(state.mcQuizActive.mcqNumCorrect, state.mcQuizActive.mcqNumAnswered).toString() + "%";
  console.log("HI: ",mcQuizAmountCorrect)
  console.log("HI: ",mcQuizModal)
  // soloReveal(mcQuizModal, mainContainer);
  mcQuizModal.style.visibility = "visible";
  mcQuizModal.style.zIndex = 101;
  utilMethods.emphasize(mcQuizModal);
  await utilMethods.delay(1600);
  mcQuizModal.style.visibility = "hidden";
  mcQuizModal.style.zIndex = 0;

  // soloHide(mcQuizModal, mainContainer);

  // utilMethods.enableInput(quizAnswerInput);
}



  function updateMCQuizPage(){
    const numCorrect = state.mcQuizActive.mcqNumCorrect;
    const numQuestion = state.mcQuizActive.mcqNumQuestion;
    const numAnswered = state.mcQuizActive.mcqNumAnswered;
    mcQuestionNumber.textContent = numAnswered;
    mcQuestionsCorrect.textContent = numCorrect;
    // mcQuestionsCorrect.textContent = numCorrect;
  }
  function checkMCQAnswered(){
    if(state.mcQuizActive.mcqNumAnswered == state.mcQuizActive.mcqNumQuestion){
      mcQuizShowScore()
      finishMCQuiz()
    }
  }

  async function mcQuizAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {

      if(state.mcQuizActive.mcqFailedAttempts === 0){
        state.mcQuizActive.mcqNumCorrect += 1;
        state.mcQuizActive.mcqNumAnswered += 1;

      }
      if(state.mcQuizActive.mcqFailedAttempts > 0){
        state.mcQuizActive.mcqNumAnswered += 1;
      }

      state.mcQuizActive.mcqFailedAttempts = 0;

      checkMCQAnswered()
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(250);
      updateMCQuizPage()
      newQuestion("multiple-choice-quiz",state.activeOperators,  mcQuizCreateOptions);
    } else {

      state.mcQuizActive.mcqFailedAttempts += 1;

      checkMCQAnswered()

      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(250);
      updateMCQuizPage()
      newQuestion("multiple-choice-quiz",state.activeOperators, mcQuizCreateOptions);

    }
  }


  function mcQuizCreateOptions(n1, n2, o1) {
    let options = utilMethods.createOptions(n1,n2,o1)
    mcQuizOptions.innerHTML = "";
    let ans = utilMethods.calculation(n1,n2,o1)
    options.forEach((option, index) => {
      const optionEl = document.createElement("button");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      let correctOption;

      if (option == ans) {
        correctOption = optionEl;
      }
      optionEl.addEventListener("mousedown", function (e) {
        let targetEl = e.target;
        if (targetEl.textContent == ans) {
          mcQuizAnswerCheck(true, targetEl);
        }
        if (targetEl.textContent != ans) {
          mcQuizAnswerCheck(false, correctOption, targetEl);
        }
      });
      mcQuizOptions.appendChild(optionEl);
    });


  }



  ///
  ///


  ////////////////////////////////////////////////////////////
  //QUIZ
  //

  async function quizAnswerCheck(bool) {
    if (bool) {
      utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);
      correctnessView(true, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool, state.quizStats);
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);
      newQuestion("quiz", state.activeOperators);
    } else {
      utilMethods.incorrectMotion(quizAnswerForm);
      correctnessView(false, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool, state.quizStats);
      checkQuizStatus(state.quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      utilMethods.resetAnswerInput([gameAnswerInput, quizAnswerInput]);
      newQuestion("quiz", state.activeOperators);
    }
  }

  async function quizShowScore() {
    quizAmountCorrect.textContent = state.quizStats.numCorrect;
    quizAmountCorrectPercentage.textContent = utilMethods.percentage(state.quizStats.numCorrect, state.quizStats.numAnswered).toString() + "%";

    // soloReveal(quizModal, mainContainer);
    quizModal.style.visibility = "visible";
    quizModal.style.zIndex = 101;
    utilMethods.emphasize(quizModal);
    await utilMethods.delay(1600);
    // soloHide(quizModal, mainContainer);
    quizModal.style.visibility = "hidden";
    quizModal.style.zIndex = 0;
    utilMethods.enableInput(quizAnswerInput);
  }

  function soloReveal(element, mainContainer) {
    element.style.visibility = "visible";
    element.style.zIndex = 101;
    utilMethods.showHide([], [mainContainer]);
  }

  function soloHide(element, mainContainer) {
    element.style.visibility = "hidden";
    element.style.zIndex = 0;
    utilMethods.showHide([mainContainer], []);
  }

  function resetQuizProperty(quizStats) {
    quizStats.numAnswered = 0;
    quizStats.numCorrect = 0;
  }

  function updateQuizScores(score, question, quizStats) {
    score.innerHTML = quizStats.numCorrect;
    question.innerHTML = quizStats.numAnswered;
  }

  function addToQuizProperty(bool, quizStats) {
    quizStats.numAnswered += 1;
    if (bool) {
      quizStats.numCorrect += 1;
    }
    updateQuizScores(quizCurrScore, quizCurrQuestion, quizStats);
  }

  async function checkQuizStatus(quizStats, currScoreContainerEl, lastScoreContainerEl, lastScoreEl) {
    if (quizStats.numAnswered == 1) {
      utilMethods.visibilityToggle(true, currScoreContainerEl);
    }
    if (quizStats.numAnswered >= quizStats.numQuestions) {
      console.log("show Modal")
      quizShowScore();
      await utilMethods.delay(1200);
      utilMethods.visibilityToggle(false, currScoreContainerEl);
      utilMethods.visibilityToggle(true, lastScoreContainerEl);
      finishQuiz(lastScoreEl, quizStats);
    }
  }

  function finishQuiz(lastScoreEl, quizStats) {
    lastScoreEl.innerHTML = quizStats.numCorrect;
    resetQuizProperty(quizStats);
    newQuestion("quiz", state.activeOperators);
  }



  //
  //END QUIZ
  ////////////////////////////////////////////////////////////






  ////////////////////////////////////////////////////////////
  //EVENT HANDLERS
  //


  function gameUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    state.userValue = userAnswer;
  }

  function gameCheckAnswerHandler(e) {
    let realAns = utilMethods.calculation(
      gameNumOne.innerHTML,
      gameNumTwo.innerHTML,
      gameOpOne.innerHTML
    );
    gameActual.innerHTML = realAns;
    gameAnswerCheck(realAns == state.userValue);
    e.preventDefault();
  }

  gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler);
  gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler);


  function quizUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    console.log("userAnswer:", userAnswer);
    state.userValue = userAnswer;
  }

  function quizAnswerHandler(e) {
    let realAns = utilMethods.calculation(
      quizNumOne.innerHTML,
      quizNumTwo.innerHTML,
      quizOpOne.innerHTML
    );

    quizAnswerCheck(realAns == state.userValue);
    e.preventDefault();
  }

  quizAnswerInput.addEventListener("input", quizUpdateAnswerHandler);
  quizAnswerForm.addEventListener("submit", quizAnswerHandler);

  function flashHandler(e) {
    const ans = utilMethods.calculation(
      flashNumOne.innerHTML,
      flashNumTwo.innerHTML,
      flashOpOne.innerHTML
    );
    flashAnswer.textContent = ans;
    if (this.classList.contains("flip")) {
      newQuestion("flash", state.activeOperators);
    }
    this.classList.toggle("flip");
    console.log(this);
    e.preventDefault();
  }


  flashCard.addEventListener("mousedown", flashHandler, false);

  burgerContainer.addEventListener("click", showMainMenu);
  burgerContainer.addEventListener("click", (e) => {
    burger.classList.toggle("open");
  });

//   newFlash.addEventListener("click", (e) => {
//     newQuestion(e.target.getAttribute("data-type"))
//   })

//  newGame.addEventListener("click", (e) => {
//     newQuestion(e.target.getAttribute("data-type"))
//   })


//   newMC.addEventListener("click", (e) => {
//     newQuestion(e.target.getAttribute("data-type"), mcCreateOptions)
//   })

//   newQuiz.addEventListener("click", (e) => {
//     newQuestion(e.target.getAttribute("data-type"))
//   })


  const activityMenuForward = document.getElementById("activity-menu-forward")

  const realMenuForward = document.getElementById("real-menu-forward")
  const realMenuBackwardUpper = document.getElementById("real-menu-backward-upper")
  const realMenuBackwardLower = document.getElementById("real-menu-backward-lower")

  const practiceMenuForward = document.getElementById("practice-menu-forward")
  const practiceMenuBackwardUpper = document.getElementById("practice-menu-backward-upper")
  const practiceMenuBackwardLower = document.getElementById("practice-menu-backward-lower")

  const operatorMenuForward = document.getElementById("operator-menu-forward")

  const operatorMenuBackwarUpper = document.getElementById("operator-menu-backward-upper")
  const operatorMenuBackwardLower = document.getElementById("operator-menu-backward-lower")
  // const operatorMenuBackward = document.getElementsByClassName("operator-menu-backward");
  const difficultyMenuForward = document.getElementById("difficulty-menu-forward")
  const difficultyMenuBackwardUpper = document.getElementById("difficulty-menu-backward-upper")
  const difficultyMenuBackwardLower = document.getElementById("difficulty-menu-backward-lower")
  const operatorMenuBackwards = [operatorMenuBackwarUpper,operatorMenuBackwardLower];
  const difficultyMenuBackwards = [difficultyMenuBackwardUpper, difficultyMenuBackwardLower]
  const practiceMenuBackwards = [practiceMenuBackwardUpper, practiceMenuBackwardLower]
  const realMenuBackwards = [realMenuBackwardUpper,realMenuBackwardLower]
  const activitiesChoices = document.querySelectorAll(".activity-choice")
  const realChoices = document.querySelectorAll(".real-choice")
  const practiceChoices = document.querySelectorAll(".practice-choice")

  function alertChooseActivity(){
    const newModal = document.createElement("div");
    newModal.innerHTML  = "Please Select An Activity"

  }
const activityAlert = document.getElementById("activity-alert-modal")
const operatorAlert = document.getElementById("operator-alert-modal")

  activityMenuForward.addEventListener("click",async(e)=>{
    console.log("go forward");
    if (updateActivity(activitiesChoices, 2) == null || undefined){
      utilMethods.visibilityTimedToggle(true,activityAlert,1000)
      return;
    }
    state.type = updateActivity(activitiesChoices, 2)
    console.log("state-activity: ",state.type)
    if(state.type == 'real'){
      utilMethods.loadSection('real-menu')

    }
    if(state.type == 'practice'){
    utilMethods.loadSection('practice-menu')
  }
  // utilMethods.loadSection('real-menu')
  })

  realMenuForward.addEventListener("click",async(e)=>{
    console.log("go forward real");
    if (updateActivity(realChoices, 3) == null || undefined){
      utilMethods.visibilityTimedToggle(true,activityAlert,1000)
      return;
    }
    state.activity = updateActivity(realChoices, 3)
    console.log("state-activity: ",state.activity)

    utilMethods.loadSection('operator-menu')

  // utilMethods.loadSection('real-menu')
  })

  practiceMenuForward.addEventListener("click",async(e)=>{
    console.log("go forward practice");
    if (updateActivity(practiceChoices, 2) == null || undefined){
      utilMethods.visibilityTimedToggle(true,activityAlert,1000)
      return;
    }
    state.activity = updateActivity(practiceChoices, 2)
    console.log("state-activity: ",state.activity)

    utilMethods.loadSection('operator-menu')

  // utilMethods.loadSection('real-menu')
  })








  for (let el of operatorMenuBackwards){
    el.addEventListener("click",(e)=>{
      utilMethods.loadSection("activity-menu")
    })
  }
  // realMenuBackwardLower.addEventListener("click",(e)=>{
  //   utilMethods.loadSection("activity-menu")
  // })
  // realMenuBackwardUpper.addEventListener("click",(e)=>{
  //   utilMethods.loadSection("activity-menu")
  // })
//  practiceMenuBackwardLower.addEventListener("click",(e)=>{
//     utilMethods.loadSection("activity-menu")
//   })
  // practiceMenuBackwardUpper.addEventListener("click",(e)=>{
  //   utilMethods.loadSection("activity-menu")
  // })
  for (let el of realMenuBackwards){
    el.addEventListener("click",(e)=>{
      utilMethods.loadSection("activity-menu")
    })
  }
  for (let el of practiceMenuBackwards){
    el.addEventListener("click",(e)=>{
      utilMethods.loadSection("activity-menu")
    })
  }


  operatorMenuForward.addEventListener("click",(e)=>{
    console.log(operatorChoices)

    //UPDATE OPERATORS
    state.activeOperators = updateOperators(operatorChoices)
    if (state.activeOperators.length == 0){
      utilMethods.visibilityTimedToggle(true,operatorAlert,1100)
      return;
    }
    console.log("active-ops1",state.activeOperators)
    //LOAD DIFFICULTY PAGE
    utilMethods.loadSection("difficulty-menu")
  })
for (let el of difficultyMenuBackwards){
 el.addEventListener("click",(e)=>{
    utilMethods.loadSection("operator-menu")
  })
}

  difficultyMenuForward.addEventListener("click",(e)=>{
    updateDifficultyRange()
    if (state.activity === "multiple-choice"){
      newQuestion(state.activity,state.activeOperators,mcCreateOptions)
    }
    if (state.activity === "multiple-choice-quiz"){
      newQuestion(state.activity,state.activeOperators,mcQuizCreateOptions)
    }
    else{
    newQuestion(state.activity,state.activeOperators)
    }
})

function addEventsForTypes(activitiesChoices,state){
  for (let activity of activitiesChoices){
    activity.addEventListener("click",(e)=>{
      activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
      let type;
      if (e.target.getAttribute("data-type")){
        type = e.target.getAttribute("data-type")
      }
      else{
        type = e.target.parentNode.getAttribute("data-type")
      }
      activity.classList.add("activity-selected")
      console.log("type: ",type)
      state.type = type
      console.log("state - type: ",state.type)


    })
  }
}

function addEventsForActivities(activitiesChoices,state){
  for (let activity of activitiesChoices){
    activity.addEventListener("click",(e)=>{
      activitiesChoices.forEach(activity => activity.classList.remove("activity-selected"))
      let type;
      if (e.target.getAttribute("data-type")){
        type = e.target.getAttribute("data-type")
      }
      else{
        type = e.target.parentNode.getAttribute("data-type")
      }
      activity.classList.add("activity-selected")
      console.log("type: ",type)
      state.type = type
      console.log("state - type: ",state.type)


    })
  }
}

function toggleOperators(e){

  e.target.classList.toggle("active-operator");

}
const operatorChoices = document.querySelectorAll(".operator-choice")
function addEventsForOperators(operatorsChoices){
  for (let operator of operatorsChoices){
    operator.addEventListener("click",toggleOperators)}
}
addEventsForTypes(activitiesChoices,state)
addEventsForOperators(operatorChoices,state)
addEventsForActivities(realChoices,state)
addEventsForActivities(practiceChoices,state)





function updateActivity(activitiesChoices, numChoices){
  let userSelection;
  for (let i = 0; i < numChoices; i++) {
    if (activitiesChoices[i].classList.contains("activity-selected")){
      userSelection = activitiesChoices[i].getAttribute("data-type")

    }
  }
  return userSelection;
}
function updateOperators(operatorChoices) {
  let ops = [];
  let amount = 0;
  for (let i = 0; i < 4; i++) {
    if (operatorChoices[i].classList.contains("active-operator")) {
      console.log("this one: ", i)
      let operatorText;
      switch(operatorChoices[i].getAttribute("id")){
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


      state.activeOperators.push(operatorText);
      console.log()
      ops.push(operatorText);
      amount++;
    }
  }


  return ops;
}
// const difficultyRange = document.getElementById("range-input")
// function updateDifficulty(difficultyRange) {
//   state.activeDifficulty = difficultyRange.getAttribute("value")
// }









function  play(activity,operators,difficulty){

}











  //Add event listeners for operator and difficulty buttons
  // function addEventsToOperatorsAndDifficultyButtons() {
  //   for (let subject of subjects) {
  //     subject.addEventListener("click", utilMethods.toggleActivate);
  //   }
  //   for (let diffButton of diffButtons) {
  //     diffButton.addEventListener("click", () => {
  //       for (let otherButton of diffButtons) {
  //         otherButton.classList.remove("active-difficulty");
  //       }
  //       diffButton.classList.add("active-difficulty");
  //       updateDifficulty();
  //     });
  //   }
  // }
  // addEventsToOperatorsAndDifficultyButtons()

  //
  //END EVENT HANDLERS
  ////////////////////////////////////////////////////////////



  var rangeInput = document.getElementById("range-input");
  var rangeValue = document.getElementById("range-value");
  var levelText = document.getElementById("level-text");



  rangeInput.addEventListener("input", () =>{

    let selectedDifficulty = parseInt(rangeInput.value);
    console.log(selectedDifficulty)
    state.activeDifficulty = selectedDifficulty
    console.log(state.activeDifficulty)
    rangeValue.textContent = selectedDifficulty;
    // var rangeWidth = parseInt(window.getComputedStyle(rangeInput).width);

  var sliderColor =  state.difficultyLevels[selectedDifficulty].color;

 rangeInput.style.setProperty('--thumb-color', sliderColor)


       levelText.textContent = state.difficultyLevels[selectedDifficulty].name;

  });












} //close window.onload function
