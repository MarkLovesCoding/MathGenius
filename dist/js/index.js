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
import { burger, burgerContainer, mainContainer, menuContainer, subjects, diffButtons } from './domElements.js';
import { flashAnswer, flashContainer, flashNumOne, flashNumTwo, flashOpOne, flashQuestionBox, flashAnswerBox, newFlash } from './domElements.js';
import { mcContainer, mcNumOne, mcNumTwo, mcOpOne, mcOptions, newMC } from './domElements.js';
import { quizContainer, quizAmountCorrect, quizAmountCorrectPercentage, quizAnswerForm, quizAnswerInput, quizCorrectness, quizCurrQuestion, quizCurrScore, quizCurrScoreContainer, quizLastScore, quizLastScoreContainer, quizModal, quizNumOne, quizNumTwo, quizOpOne, newQuiz } from './domElements.js';
import { gameContainer, gameCorrectness, gameNumOne, gameNumTwo, gameOpOne, newGame, gameActual, gameActualContainer, gameAnswerInput, gameAnswerSubmit, gameCurrScore, gameHighScore, gameLevelNumber, gameTracker, gameTracker2, gameTrackerContainer, gameTrackerContainer2 } from './domElements.js';
window.onload = function () {
  var state = {
    activeOperators: ["+"],
    activeHighVal: 10,
    activeDifficulty: 1,
    activeMultiplyHighVal: 4
  };

  // VARIABLES
  const operators = ["+", "-", "x", "÷"];

  // var HIGH_VAL = 10; // Highest Number used

  var userValue;
  var high_score = 0; // Default highscore
  var quizStats = {
    numQuestions: 10,
    numAnswered: 0,
    numCorrect: 0
  };
  var mcQuizStats = {
    numQuestions: 10,
    numAnswered: 0,
    numCorrect: 0
  };
  var OPERATORSSELECTED = [];
  function burgerOn() {
    if (burger.classList.contains("open")) {
      burger.classList.remove("open");
    }
  }
  function burgerOff() {
    if (!burger.classList.contains("open")) {
      burger.classList.add("open");
    }
  }
  function newGeneralQuestion(opEl, n1El, n2El, func) {
    const subjects = updateSubjects();
    let o1 = utilMethods.randOp(subjects);
    let n1 = utilMethods.randomNumber(0, state.activeHighVal);
    let n2 = utilMethods.randomNumber(0, state.activeHighVal);
    console.log(n1, n2, o1);
    if (o1 === "x") {
      n1 = utilMethods.randomNumber(0, state.activeMultiplyHighVal);
      n2 = utilMethods.randomNumber(0, state.activeMultiplyHighVal);
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
  function gameNewQuestion() {
    burgerOn();
    utilMethods.showHide([gameContainer, burgerContainer, gameActualContainer, gameCorrectness], [quizContainer, flashContainer]);
    hideMenu();
    newGeneralQuestion(gameOpOne, gameNumOne, gameNumTwo);
  }
  function quizNewQuestion() {
    burgerOn();
    utilMethods.showHide([quizContainer, burgerContainer], [gameContainer]);
    hideMenu();
    newGeneralQuestion(quizOpOne, quizNumOne, quizNumTwo);
  }
  function mcNewQuestion() {
    burgerOn();
    utilMethods.showHide([mcContainer, burgerContainer], [gameContainer, quizContainer, flashContainer]);
    hideMenu();
    newGeneralQuestion(mcOpOne, mcNumOne, mcNumTwo, mcCreateOptions);
  }
  function flashNewQuestion() {
    burgerOn();
    utilMethods.showHide([flashContainer, flashQuestionBox, flashAnswerBox, burgerContainer], [mcContainer, gameContainer, quizContainer]);
    hideMenu();
    newGeneralQuestion(flashOpOne, flashNumOne, flashNumTwo);
  }
  function flashHandler(e) {
    const ans = utilMethods.calculation(flashNumOne.innerHTML, flashNumTwo.innerHTML, flashOpOne.innerHTML);
    flashAnswer.textContent = ans;
    if (this.classList.contains("flip")) {
      flashNewQuestion();
    }
    this.classList.toggle("flip");
    console.log(this);
    e.preventDefault();
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
      resetAnswerInput();
      gameNewQuestion();
    } else {
      utilMethods.showHide([], [burgerContainer]);
      correctnessView(false, gameCorrectness);
      utilMethods.incorrectMotion(gameCorrectness);
      utilMethods.disableInput(gameAnswerInput);
      utilMethods.visibilityTimedToggle(true, gameActualContainer);
      await utilMethods.delay(700);
      resetAnswerInput();
      resetScore();
      resetProgress();
      gameNewQuestion();
      await utilMethods.delay(1500);
      utilMethods.enableInput(gameAnswerInput);
    }
  }
  async function quizAnswerCheck(bool) {
    if (bool) {
      utilMethods.emphasize(quizAnswerForm, 50, 1.1, 150);
      correctnessView(true, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool);
      checkQuizStatus(quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      resetAnswerInput();
      quizNewQuestion();
    } else {
      utilMethods.incorrectMotion(quizAnswerForm);
      correctnessView(false, quizCorrectness);
      utilMethods.disableInput(quizAnswerInput);
      addToQuizProperty(bool);
      checkQuizStatus(quizStats, quizCurrScoreContainer, quizLastScoreContainer, quizLastScore);
      await utilMethods.delay(700);
      utilMethods.enableInput(quizAnswerInput);
      resetAnswerInput();
      quizNewQuestion();
    }
  }
  async function mcAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      mcNewQuestion();
    } else {
      utilMethods.animateIncorrect(falseEl);
      utilMethods.animateCorrect(correctEl);
      await utilMethods.delay(700);
      mcNewQuestion();
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
    let difficulty;
    for (let i = 0; i <= 4; i++) {
      if (diffButtons[i].classList.contains("active-difficulty")) {
        difficulty = diffButtons[i].textContent;
        switch (i) {
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
        state.activeMultiplyHighVal = highVal;
        state.activeHighVal = (i + 1) * 10;
        state.activeDifficulty = i;
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
  function gameUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    userValue = userAnswer;
  }
  function gameCheckAnswerHandler(e) {
    let realAns = utilMethods.calculation(gameNumOne.innerHTML, gameNumTwo.innerHTML, gameOpOne.innerHTML);
    gameActual.innerHTML = realAns;
    gameAnswerCheck(realAns == userValue);
    e.preventDefault();
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
  function resetAnswerInput() {
    gameAnswerInput.value = "";
    quizAnswerInput.value = "";
  }

  ////-------------

  function updateScore() {
    let currScoreInner = parseInt(gameCurrScore.innerHTML);
    currScoreInner += 1;
    gameCurrScore.innerHTML = currScoreInner;
    checkHighScore();
  }
  function percentage(n1, n2) {
    return Math.round(n1 / n2 * 100);
  }
  async function quizShowScore() {
    quizAmountCorrect.textContent = quizStats.numCorrect;
    quizAmountCorrectPercentage.textContent = percentage(quizStats.numCorrect, quizStats.numAnswered).toString() + "%";
    quizModalReveal();
    utilMethods.emphasize(quizModal);
    await utilMethods.delay(2400);
    quizModalHide();
    utilMethods.enableInput(quizAnswerInput);
  }
  function levelUp(level) {
    let newColor = `hsl( ${level * 30}, 100%, 50%)`;
    gameTracker.style.backgroundColor = newColor;
    gameTracker2.style.backgroundColor = newColor;
  }
  function addlevel() {
    let fullWidth = window.getComputedStyle(gameTrackerContainer2).width;
    let borderWidth = window.getComputedStyle(gameTrackerContainer2).getPropertyValue("border-width");
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
      resetProgress();
      addlevel();
      level += 1;
      levelUp(level);
      await utilMethods.delay(1000);
      utilMethods.enableInput(gameAnswerInput);
    }
    gameLevelNumber.textContent = level;
  }
  function resetLevel() {
    gameLevelNumber.textContent = 0;
  }
  function resetProgress() {
    gameTracker.style.width = "0px";
  }
  function resetLevelProgress() {
    gameTracker2.style.width = "0px";
  }
  async function updateProgress() {
    let fullWidth = window.getComputedStyle(gameTrackerContainer).width;
    let borderWidth = window.getComputedStyle(gameTrackerContainer).getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    let progressWidth = window.getComputedStyle(gameTracker).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    gameTracker.style.width = progressWidth + "px";
    if (progressWidth == fullWidth) {
      await utilMethods.delay(1000);
      resetProgress();
    }
  }
  function revealMenu() {
    menuContainer.style.display = "grid";
  }
  function hideMenu() {
    menuContainer.style.display = "none";
  }
  function showMainMenu() {
    revealMenu();
    utilMethods.showHide([], [flashContainer, flashAnswerBox, gameContainer, quizContainer, correctness, gameActualContainer, mcContainer]);
    resetQuizProperty();
    resetLevel();
    resetProgress();
    resetLevelProgress();
  }
  function quizModalReveal() {
    quizModal.style.visibility = "visible";
    quizModal.style.zIndex = "10";
    utilMethods.showHide([], [mainContainer]);
  }
  function quizModalHide() {
    quizModal.style.visibility = "hidden";
    quizModal.style.zIndex = "0";
    utilMethods.showHide([mainContainer]);
  }
  function resetQuizProperty() {
    quizStats.numAnswered = 0;
    quizStats.numCorrect = 0;
  }
  function updateQuizScores() {
    quizCurrScore.innerHTML = quizStats.numCorrect;
    quizCurrQuestion.innerHTML = quizStats.numAnswered;
  }
  function addToQuizProperty(bool) {
    quizStats.numAnswered += 1;
    if (bool) {
      quizStats.numCorrect += 1;
      console.log(quizStats);
    }
    updateQuizScores();
  }
  async function checkQuizStatus(quizStats, currScoreContainerEl, lastScoreContainerEl, lastScoreEl) {
    if (quizStats.numAnswered == 1) {
      utilMethods.visibilityToggle(true, currScoreContainerEl);
    }
    if (quizStats.numAnswered >= quizStats.numQuestions) {
      console.log("show Modal");
      quizShowScore();
      await utilMethods.delay(1200);
      utilMethods.visibilityToggle(false, currScoreContainerEl);
      utilMethods.visibilityToggle(true, lastScoreContainerEl);
      finishQuiz(lastScoreEl, quizStats);
    }
  }
  function finishQuiz(lastScoreEl, quizStats) {
    lastScoreEl.innerHTML = quizStats.numCorrect;
    resetQuizProperty();
    quizNewQuestion();
  }
  function quizUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    console.log("userAnswer:", userAnswer);
    userValue = userAnswer;
  }
  function quizAnswerHandler(e) {
    let realAns = utilMethods.calculation(quizNumOne.innerHTML, quizNumTwo.innerHTML, quizOpOne.innerHTML);
    console.log("realAns: ", realAns);
    quizAnswerCheck(realAns == userValue);
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
  burgerContainer.addEventListener("click", event => {
    burger.classList.toggle("open");
  });
  newGame.addEventListener("click", gameNewQuestion);
  newQuiz.addEventListener("click", quizNewQuestion);
  newMC.addEventListener("click", mcNewQuestion);
  newFlash.addEventListener("click", flashNewQuestion);
};