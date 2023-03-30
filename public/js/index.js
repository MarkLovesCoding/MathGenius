//TO DO

//BUGS to fix before refactor:
// color doesn't change back to defauly on game when leave.
// bar will eventually extend past width.

//burger shouldn't show up at first, or shoul dbe math symbls.
//figure out why animations won't work when the quiz animation works 10/10. possibly convcert to animation fram and toggle classnames

//features
//fun--make burger turn into the different operators
//rename games and provide icons on buttons?

//add badges for each level, for each difficulty that quiz was passed.
//save to profile. create profile.
// input
import * as utilMethods from './ulils.js';
import {burger, burgerContainer, mainContainer, menuContainer, subjects,diffButtons} from './domElements.js'

import { flashAnswer, flashContainer, flashNumOne, flashNumTwo, flashOpOne, flashQuestionBox, flashAnswerBox, newFlash } from './domElements.js';
import { mcContainer, mcNumOne, mcNumTwo, mcOpOne, mcOptions, newMC } from './domElements.js';
import { quizContainer, quizAmountCorrect, quizAmountCorrectPercentage, quizAnswerForm, quizAnswerInput, quizCorrectness, quizCurrQuestion, quizCurrScore, quizCurrScoreContainer, quizLastScore, quizLastScoreContainer, quizModal, quizNumOne, quizNumTwo, quizOpOne, newQuiz} from './domElements.js';
import { gameContainer, gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, newGame, gameActual, gameActualContainer, gameAnswerInput, gameAnswerSubmit,gameCurrScore,gameHighScore,gameLevelNumber,gameTracker,gameTracker2,gameTrackerContainer,gameTrackerContainer2 } from './domElements.js';
import {state} from './state.js'
window.onload = function() {

  // VARIABLES
  const operators = ["+", "-", "x", "÷"];
  
  // var HIGH_VAL = 10; // Highest Number used
  

  var high_score = 0; // Default highscore

  var mcQuizStats = {
    numQuestions: 10,
    numAnswered: 0,
    numCorrect: 0
  }
  var OPERATORSSELECTED = [];




  
  function burgerOn() {
    if (burger.classList.contains("open")) {
      burger.classList.remove("open");
    }
  }
  // function burgerOff() {
  //   if (!burger.classList.contains("open")) {
  //     burger.classList.add("open");
  //   }
  // }
  
  function newGeneralQuestion(opEl,n1El,n2El, func){
    const subjects = updateSubjects();
    let o1 = utilMethods.randOp(subjects);
  
     let n1 = utilMethods.randomNumber(0,  state.activeHighVal);
      let n2 = utilMethods.randomNumber(0,  state.activeHighVal);
    console.log(n1,n2, o1)
    if(o1 === "x"){
   
  
      
      n1 = utilMethods.randomNumber(0,  state.activeMultiplyHighVal);
      n2 = utilMethods.randomNumber(0,  state.activeMultiplyHighVal);
    }
  
    if (o1 === "÷") {
  
      while (n1 % n2 != 0) {
        n1 = utilMethods.randomNumber(0,  state.activeHighVal);
        n2 = utilMethods.randomNumber(1,  state.activeHighVal);
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
    if(func) func(n1,n2,o1);
  }
function newQuestion(type, options){
  let elementsToHide, elementsToShow, num1, num2, op1;
  switch(type){
    case "flash":
      elementsToHide = [mcContainer, gameContainer, quizContainer]
      elementsToShow =[flashContainer, flashQuestionBox, flashAnswerBox, burgerContainer];
      num1 = flashNumOne;
      num2 = flashNumTwo;
      op1 = flashOpOne;
      break;
    case "multiple-choice":
      elementsToHide =  [ gameContainer, quizContainer, flashContainer]
      elementsToShow =[mcContainer, burgerContainer];
      num1 = mcNumOne;
      num2 = mcNumTwo;
      op1 = mcOpOne;
      break;
    case "quiz":
      elementsToHide =  [ gameContainer]
      elementsToShow = [quizContainer, burgerContainer];
      num1 = quizNumOne;
      num2 = quizNumTwo;
      op1 = quizOpOne;
      break;   
    case "game":
      elementsToHide = [ quizContainer, flashContainer]
      elementsToShow = [gameContainer, burgerContainer, gameActualContainer, gameCorrectness];
      num1 = gameNumOne;
      num2 = gameNumTwo;
      op1 = gameOpOne;
      break; 
    default:
      break;
  }

  burgerOn();
  utilMethods.showHide(elementsToShow,elementsToHide);
  displayNone(menuContainer);
  newGeneralQuestion(op1,num1,num2,options)
}



  
  async function gameAnswerCheck(bool) {
    if (bool) {
      correctnessView(true, gameCorrectness);
      utilMethods.emphasize(gameCorrectness);
      utilMethods.visibilityTimedToggle(false, gameActualContainer);
      updateScore();
      await updateLevel();
      utilMethods.disableInput(gameAnswerInput);
      await utilMethods.delay(700);
      utilMethods.enableInput(gameAnswerInput);
      resetAnswerInput([gameAnswerInput,quizAnswerInput]);
      // gameNewQuestion();
      newQuestion("game");
    } else {
      utilMethods.showHide([], [burgerContainer]);
      correctnessView(false, gameCorrectness);
      utilMethods.incorrectMotion(gameCorrectness);
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.visibilityTimedToggle(true, gameActualContainer);
      await utilMethods.delay(700);
      resetAnswerInput([gameAnswerInput,quizAnswerInput]);

      resetScore();
      resetWidth(gameTracker);
      // gameNewQuestion();
      newQuestion("game");
      await utilMethods.delay(1500);
      utilMethods.enableInput(gameAnswerInput);
    }
  }
  
  async function quizAnswerCheck(bool) {
    if (bool) {
      utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);
      correctnessView(true, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool,state.quizStats);
      checkQuizStatus(state.quizStats,quizCurrScoreContainer,quizLastScoreContainer,quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      resetAnswerInput([gameAnswerInput,quizAnswerInput]);

      // quizNewQuestion();
      newQuestion("quiz");
    } else {
      utilMethods.incorrectMotion(quizAnswerForm);
      correctnessView(false, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool,state.quizStats);
      checkQuizStatus(state.quizStats,quizCurrScoreContainer,quizLastScoreContainer,quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      resetAnswerInput([gameAnswerInput,quizAnswerInput]);

      // quizNewQuestion();
      newQuestion("quiz");
    }
  }
  
  async function mcAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      // mcNewQuestion();
      newQuestion("multiple-choice",mcCreateOptions);
    } else {
      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      // mcNewQuestion();
      newQuestion("multiple-choice",mcCreateOptions);

    }
  }
  

  
  
  function mcCreateOptions(n1, n2, o1) {
    var options = [];
    let r1, r2, r3;
    const ans = utilMethods.calculation(n1, n2, o1);
    options.push(ans);
    do {
      r1 = utilMethods.randomNumber(0, ans + 5);
    } while (options.includes(r1));
    options.push(r1);
    do {
      r2 = utilMethods.randomNumber(0, ans + 5);
    } while (options.includes(r2));
    options.push(r2);
    do {
      r3 = utilMethods.randomNumber(0, ans + 5);
    } while (options.includes(r3));
    options.push(r3);
  
    options = utilMethods.shuffle(options);
    mcOptions.innerHTML = "";
  
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
  

  ////--------------

  

  
  function updateDifficulty() {
    
    let difficulty, highVal;
    for (let i = 0; i <= 4; i++) {
      if (diffButtons[i].classList.contains("active-difficulty")) {
        difficulty = diffButtons[i].textContent;
        
        switch(i){
        case 0:
          highVal = 3;
          break;
        case 1:
          highVal = 5;
          break;
        case 2:
          highVal = 7;
          break;
        case 3:
          highVal = 9;
          break;
        case 4:
          highVal = 12;
          break;
       }
        state.activeMultiplyHighVal = highVal
        state.activeHighVal = (i + 1) * 10;
        state.activeDifficulty = i
      }
    }
  }
  
  // UPDATES OPERATORS BASED ON SELECTIONS
  function updateSubjects() {
    let ops = [];
    let amount = 0;
    for (let i = 0; i < 4; i++) {
      if (subjects[i].classList.contains("active-subject")) {
        state.activeOperators.push(subjects[i].textContent);
        ops.push(subjects[i].textContent);
        amount++;
      }
    }
  
    if (amount == 0) {
      ops[0] = "+"; //Default to addition if none selected
    }
    return ops;
  }
  
  
  function resetScore() {
    gameCurrScore.innerHTML = 0;
  }
  
  function checkHighScore() {
    let curr = gameCurrScore.innerHTML;
    if (curr > parseInt(high_score)) {
      high_score = curr;
      gameHighScore.innerHTML = curr;
    } else {
      gameHighScore.innerHTML = high_score;
    }
  }
  

  
  function correctnessView(bool, element) {
    utilMethods.showHide([element], []);
    if (bool) {
      element.classList.add("correct-answer");
      element.classList.remove("incorrect-answer");
      element.textContent = "CORRECT";
    } else {
      element.classList.remove("correct-answer");
      element.classList.add("incorrect-answer");
      element.textContent = "INCORRECT";
    }
  }
  
  function resetAnswerInput(elementsArray) {
    for (let el of elementsArray){
      el.value = "";
    }
  }
  
  ////-------------

  
  function updateScore() {
    let currScoreInner = parseInt(gameCurrScore.innerHTML);
    currScoreInner += 1;
    gameCurrScore.innerHTML = currScoreInner;
    checkHighScore();
  }
  function percentage(n1,n2){
    return Math.round(n1/n2*100)
  }
  async function quizShowScore() {
    quizAmountCorrect.textContent = state.quizStats.numCorrect;
    quizAmountCorrectPercentage.textContent = percentage(state.quizStats.numCorrect,state.quizStats.numAnswered).toString() + "%";
    
    soloReveal(quizModal,mainContainer);
    utilMethods.emphasize(quizModal);
    await utilMethods.delay(2200);
    soloHide(quizModal, mainContainer);
    utilMethods.enableInput(quizAnswerInput);
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
      resetWidth(gameTracker);
      addlevel();
      level += 1;
      levelUp(level);
      await utilMethods.delay(1000);
      utilMethods.enableInput(gameAnswerInput);
    }
    gameLevelNumber.textContent = level;
  }
  
  function resetNumberToZero(element) {
    element.textContent = 0;
  }
  function resetWidth(element){
    element.style.width = "0px";
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
      resetWidth(gameTracker);
    }
  }
  function displayGrid(element){
    element.style.display = "grid";
  }
  function displayNone(element){
    element.style.display = "none";
  }


  function showMainMenu() {
    displayGrid(menuContainer);
    utilMethods.showHide(
      [],
      [
        flashContainer,
        flashAnswerBox,
        gameContainer,
        quizContainer,
        gameCorrectness,
        gameActualContainer,
        mcContainer
      ]
    );
    resetQuizProperty(state.quizStats);
    resetNumberToZero(gameLevelNumber);
    resetWidth(gameTracker);
    resetWidth(gameTracker2);
  }
  function soloReveal(element,mainContainer) {
    element.style.visibility = "visible";
    element.style.zIndex = "10";
    utilMethods.showHide([], [mainContainer]);
  }
  function soloHide(element,mainContainer) {
    element.style.visibility = "hidden";
    element.style.zIndex = "10";
    utilMethods.showHide([mainContainer], []);
  }

  
  function resetQuizProperty(quizStats) {
    quizStats.numAnswered = 0;
    quizStats.numCorrect = 0;
  }
  function updateQuizScores( score,question,quizStats) {
    score.innerHTML = quizStats.numCorrect;
    question.innerHTML = quizStats.numAnswered;
  }
  function addToQuizProperty(bool,quizStats) {
    quizStats.numAnswered += 1;
    if (bool) {
      quizStats.numCorrect += 1;
    }
    updateQuizScores(quizCurrScore,quizCurrQuestion,quizStats);
  }
  async function checkQuizStatus(quizStats,currScoreContainerEl,lastScoreContainerEl,lastScoreEl) {
    if (quizStats.numAnswered == 1) {
      utilMethods.visibilityToggle(true, currScoreContainerEl);
    }
    if (quizStats.numAnswered >= quizStats.numQuestions) {
      console.log("show Modal")
      quizShowScore();
      await utilMethods.delay(1200);
      utilMethods.visibilityToggle(false, currScoreContainerEl);
      utilMethods.visibilityToggle(true, lastScoreContainerEl);
      finishQuiz(lastScoreEl,quizStats);
    }
  }
  function finishQuiz(lastScoreEl,quizStats) {
    lastScoreEl.innerHTML = quizStats.numCorrect;
    resetQuizProperty(quizStats);
    newQuestion("quiz");
  }
  
  
  function flashHandler(e) {
    const ans = utilMethods.calculation(
      flashNumOne.innerHTML,
      flashNumTwo.innerHTML,
      flashOpOne.innerHTML
    );
    flashAnswer.textContent = ans;
    if (this.classList.contains("flip")) {
      newQuestion("flash");
    }
    this.classList.toggle("flip");
    console.log(this);
    e.preventDefault();
  }




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

  flashContainer.addEventListener("mousedown", flashHandler, false);
  gameAnswerInput.addEventListener("input", gameUpdateAnswerHandler);
  gameAnswerSubmit.addEventListener("submit", gameCheckAnswerHandler);
  quizAnswerInput.addEventListener("input", quizUpdateAnswerHandler);
  quizAnswerForm.addEventListener("submit", quizAnswerHandler);
  
  for (let subject of subjects) {
    subject.addEventListener("click", utilMethods.toggleActivate);
  }
  for (let diffButton of diffButtons) {
    diffButton.addEventListener("click", () => {
      for (let otherButton of diffButtons) {
        otherButton.classList.remove("active-difficulty");
      }
      diffButton.classList.add("active-difficulty");
      updateDifficulty();
    });
  }
  
  burgerContainer.addEventListener("click", showMainMenu);
  burgerContainer.addEventListener("click", (e) => {
    burger.classList.toggle("open");
  });
  newFlash.addEventListener("click", (e)=>{
    // console.log(e.target.getAttribute('data-type'))
    newQuestion(e.target.getAttribute("data-type"))
  })
  newGame.addEventListener("click",(e)=>{
  // console.log(e.target.getAttribute('data-type'))
  newQuestion(e.target.getAttribute("data-type"))
})
  newQuiz.addEventListener("click",(e)=>{
  // console.log(e.target.getAttribute('data-type'))
  newQuestion(e.target.getAttribute("data-type"))
})
  newMC.addEventListener("click", (e)=>{
    // console.log(e.target.getAttribute('data-type'))
    newQuestion(e.target.getAttribute("data-type"),mcCreateOptions)
  })
  
  






}