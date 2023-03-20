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

// import * as utilMethods from './ulils.js';

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
  // ELEMENTS
  //

  // const burger = document.querySelector('.new-game-container')

  const burger = document.getElementById("burger");
  // const chooseContainer = document.getElementById("choose-container");

  const mainContainer = document.getElementById("main-container");
  const diffButtons = document.querySelectorAll(".diff-button");
  const subjects = document.querySelectorAll(".subject");
  const menuContainer = document.getElementById("menu-container");
  const burgerContainer = document.getElementById("burger-container");
  const newGame = document.getElementById("new-game");
  const gameContainer = document.getElementById("game-container");
  const gameNumOne = document.getElementById("first-number");
  const gameNumTwo = document.getElementById("second-number");
  const gameOpOne = document.getElementById("first-operator");
  const answerInput = document.getElementById("answer-input");
  const answerSubmit = document.getElementById("answer-form");
  const gameCorrectness = document.getElementById("correctness");
  const actual = document.getElementById("actual");
  const actualContainer = document.getElementById("actual-container");
  const currScore = document.getElementById("current-score");
  const highScore = document.getElementById("current-high");
  const levelNumber = document.getElementById("level-number");
  const tracker = document.getElementById("tracker");
  const tracker2 = document.getElementById("tracker-2");
  const trackerContainer = document.getElementById("tracker-container");
  const trackerContainer2 = document.getElementById("tracker-container-2");

  // quiz
  const quizContainer = document.getElementById("quiz-container");
  const quizAnswerForm = document.getElementById("quiz-answer-form");
  const newQuiz = document.getElementById("new-quiz");
  const quizNumOne = document.getElementById("quiz-first-number");
  const quizNumTwo = document.getElementById("quiz-second-number");
  const quizOpOne = document.getElementById("quiz-first-operator");
  const quizAnswerInput = document.getElementById("quiz-answer-input");
  const quizCorrectness = document.getElementById("quiz-correctness");
  const quizAmountCorrect = document.getElementById("amountCorrect");
  const quizAmountCorrectPercentage = document.getElementById("amountCorrectPercentage");
  const quizCurrScore = document.getElementById("quiz-curr-score");
  const quizCurrQuestion = document.getElementById("quiz-curr-question");
  const quizCurrScoreContainer = document.querySelector(".quiz-curr-score-container");
  const quizLastScoreContainer = document.querySelector(".quiz-last-score-container");
  const quizLastScore = document.getElementById("quiz-last-score");
  const quizModal = document.getElementById("quiz-modal");
  const newMC = document.getElementById("new-mc");
  const mcContainer = document.getElementById("mc-container");
  const mcOptions = document.getElementById("mc-options");
  const mcNumOne = document.getElementById("mc-first-number");
  const mcNumTwo = document.getElementById("mc-second-number");
  const mcOpOne = document.getElementById("mc-first-operator");
  const flashContainer = document.getElementById("flash-container");
  const newFlash = document.getElementById("new-flash");
  const flashAnswer = document.getElementById("flash-answer");
  const flashAnswerBox = document.getElementById("flash-answer-box");
  const flashQuestionBox = document.getElementById("flash-question-box");
  const flashNumOne = document.getElementById("flash-first-number");
  const flashNumTwo = document.getElementById("flash-second-number");
  const flashOpOne = document.getElementById("flash-first-operator");
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
    let o1 = randOp(subjects);
    let n1 = randomNumber(0, state.activeHighVal);
    let n2 = randomNumber(0, state.activeHighVal);
    console.log(n1, n2, o1);
    if (o1 === "x") {
      n1 = randomNumber(0, state.activeMultiplyHighVal);
      n2 = randomNumber(0, state.activeMultiplyHighVal);
    }
    if (o1 === "÷") {
      while (n1 % n2 != 0) {
        n1 = randomNumber(0, state.activeHighVal);
        n2 = randomNumber(1, state.activeHighVal);
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
    console.log(calculation(n1, n2, o1));
    if (func) func(n1, n2, o1);
  }
  function gameNewQuestion() {
    burgerOn();
    showHide([gameContainer, burgerContainer, actualContainer, gameCorrectness], [quizContainer, flashContainer]);
    hideMenu();
    newGeneralQuestion(gameOpOne, gameNumOne, gameNumTwo);
  }
  function quizNewQuestion() {
    burgerOn();
    showHide([quizContainer, burgerContainer], [gameContainer]);
    hideMenu();
    newGeneralQuestion(quizOpOne, quizNumOne, quizNumTwo);
  }
  function mcNewQuestion() {
    burgerOn();
    showHide([mcContainer, burgerContainer], [gameContainer, quizContainer, flashContainer]);
    hideMenu();
    newGeneralQuestion(mcOpOne, mcNumOne, mcNumTwo, mcCreateOptions);
  }
  function flashNewQuestion() {
    burgerOn();
    showHide([flashContainer, flashQuestionBox, flashAnswerBox, burgerContainer], [mcContainer, gameContainer, quizContainer]);
    hideMenu();
    newGeneralQuestion(flashOpOne, flashNumOne, flashNumTwo);
  }
  function flashHandler(e) {
    const ans = calculation(flashNumOne.innerHTML, flashNumTwo.innerHTML, flashOpOne.innerHTML);
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
      emphasize(gameCorrectness);
      visibilityTimedToggle(false, actualContainer);
      updateScore();
      await updateLevel();
      disableInput(answerInput);
      await delay(700);
      enableInput(answerInput);
      resetAnswerInput();
      gameNewQuestion();
    } else {
      showHide([], [burgerContainer]);
      correctnessView(false, gameCorrectness);
      incorrectMotion(gameCorrectness);
      disableInput(answerInput);
      visibilityTimedToggle(true, actualContainer);
      await delay(700);
      resetAnswerInput();
      resetScore();
      resetProgress();
      gameNewQuestion();
      await delay(1500);
      enableInput(answerInput);
    }
  }
  async function quizAnswerCheck(bool) {
    if (bool) {
      emphasize(quizAnswerForm, 50, 1.1, 150);
      correctnessView(true, quizCorrectness);
      disableInput(quizAnswerInput);
      addToQuizProperty(bool);
      checkQuizStatus();
      await delay(700);
      enableInput(quizAnswerInput);
      resetAnswerInput();
      quizNewQuestion();
    } else {
      incorrectMotion(quizAnswerForm);
      correctnessView(false, quizCorrectness);
      disableInput(quizAnswerInput);
      addToQuizProperty(bool);
      checkQuizStatus();
      await delay(700);
      enableInput(quizAnswerInput);
      resetAnswerInput();
      quizNewQuestion();
    }
  }
  async function mcAnswerCheck(bool, correctEl, falseEl = null) {
    if (bool) {
      animateCorrect(correctEl);
      await delay(700);
      mcNewQuestion();
    } else {
      animateIncorrect(falseEl);
      animateCorrect(correctEl);
      await delay(700);
      mcNewQuestion();
    }
  }
  function visibilityTimedToggle(bool, element) {
    if (bool) {
      element.style.visibility = "visible";
      setTimeout(() => {
        element.style.visibility = "hidden";
      }, 2000);
    }
    if (!bool) {
      element.style.visibility = "hidden";
    }
  }
  function visibilityToggle(bool, element) {
    if (bool) {
      element.style.visibility = "visible";
    }
    if (!bool) {
      element.style.visibility = "hidden";
    }
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  function mcCreateOptions(n1, n2, o1) {
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
  function animateCorrect(element) {
    element.style.background = "green";
    element.style.borderColor = "white";
    setTimeout(() => {
      element.style.background = "rgb(200 200 200 / 95%)";
      element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
  }
  function animateIncorrect(element) {
    element.style.background = "darkred";
    element.style.borderColor = "white";
    setTimeout(() => {
      element.style.background = "rgb(200 200 200 / 95%)";
      element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
  }

  //  UTILITY FUNCTIONS
  function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
  }
  function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2);
  }
  function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
  }
  function divide(num1, num2) {
    return parseInt(num1) / parseInt(num2);
  }

  // RANDOM NUMBER / OPERATOR FUNCTIONS-----------
  function randomNumber(min, max) {
    let span = max - min;
    let rand = Math.floor(Math.random() * span) + min;
    return rand;
  }
  function randOp(arr = operators) {
    let l = arr.length;
    let r = Math.floor(Math.random() * l);
    return arr[r];
  }
  function delay(time) {
    return new Promise(res => {
      setTimeout(res, time);
    });
  }
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

  // GLOBAL UTILITIES
  //-------
  function calculation(n1, n2, o1) {
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

  ////////------------
  function disableInput(element) {
    element.setAttribute("disabled", "true");
  }
  function enableInput(element) {
    element.removeAttribute("disabled");
    element.focus();
  }
  ////-------------

  function resetScore() {
    currScore.innerHTML = 0;
  }
  function checkHighScore() {
    let curr = currScore.innerHTML;
    if (curr > parseInt(high_score)) {
      high_score = curr;
      highScore.innerHTML = curr;
    } else {
      highScore.innerHTML = high_score;
    }
  }
  function gameUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    userValue = userAnswer;
  }
  function gameCheckAnswerHandler(e) {
    let realAns = calculation(gameNumOne.innerHTML, gameNumTwo.innerHTML, gameOpOne.innerHTML);
    actual.innerHTML = realAns;
    gameAnswerCheck(realAns == userValue);
    e.preventDefault();
  }
  function correctnessView(bool, element) {
    showHide([element], []);
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
    answerInput.value = "";
    quizAnswerInput.value = "";
  }

  ////-------------
  function toggleActivate(e) {
    e.target.classList.toggle("active-subject");
  }
  function updateScore() {
    let currScoreInner = parseInt(currScore.innerHTML);
    currScoreInner += 1;
    currScore.innerHTML = currScoreInner;
    checkHighScore();
  }
  function percentage(n1, n2) {
    return Math.round(n1 / n2 * 100);
  }
  async function quizShowScore() {
    quizAmountCorrect.textContent = quizStats.numCorrect;
    quizAmountCorrectPercentage.textContent = percentage(quizStats.numCorrect, quizStats.numAnswered).toString() + "%";
    quizModalReveal();
    emphasize(quizModal);
    await delay(2400);
    quizModalHide();
    enableInput(quizAnswerInput);
  }
  function levelUp(level) {
    let newColor = `hsl( ${level * 30}, 100%, 50%)`;
    tracker.style.backgroundColor = newColor;
    tracker2.style.backgroundColor = newColor;
  }
  function addlevel() {
    let fullWidth = window.getComputedStyle(trackerContainer2).width;
    let borderWidth = window.getComputedStyle(trackerContainer2).getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    let progressWidth = window.getComputedStyle(tracker2).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    tracker2.style.width = progressWidth + "px";
  }
  async function updateLevel() {
    let level = parseInt(levelNumber.textContent);
    if (parseInt(currScore.textContent) % 1 == 0) {
      updateProgress();
    }
    if (parseInt(currScore.textContent) % 10 == 0) {
      console.log("reset");
      disableInput(answerInput);
      resetProgress();
      addlevel();
      level += 1;
      levelUp(level);
      await delay(1000);
      enableInput(answerInput);
    }
    levelNumber.textContent = level;
  }
  function resetLevel() {
    levelNumber.textContent = 0;
  }
  function resetProgress() {
    tracker.style.width = "0px";
  }
  function resetLevelProgress() {
    tracker2.style.width = "0px";
  }
  async function updateProgress() {
    let fullWidth = window.getComputedStyle(trackerContainer).width;
    let borderWidth = window.getComputedStyle(trackerContainer).getPropertyValue("border-width");
    fullWidth = parseFloat(fullWidth.slice(0, -2));
    borderWidth = parseFloat(borderWidth.slice(0, -2));
    fullWidth = fullWidth - borderWidth * 2;
    let progressWidth = window.getComputedStyle(tracker).width;
    progressWidth = parseFloat(progressWidth.slice(0, -2));
    progressWidth += fullWidth / 10;
    tracker.style.width = progressWidth + "px";
    if (progressWidth == fullWidth) {
      await delay(1000);
      resetProgress();
    }
  }

  /////////----------------
  function showHide(elementsShow = [], elementsHide = []) {
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

  // function quizRevealCurrScore() {
  //   showHide([quizCurrScoreContainer], []);
  // }
  // function quizHideCurrScore() {
  //   showHide([], [quizCurrScoreContainer]);
  // }
  // function quizRevealLastScore() {
  //   showHide([quizLastScoreContainer], []);
  // }
  function revealMenu() {
    menuContainer.style.display = "grid";
  }
  function hideMenu() {
    menuContainer.style.display = "none";
  }
  function showMainMenu() {
    revealMenu();
    showHide([], [flashContainer, flashAnswerBox, gameContainer, quizContainer, correctness, actualContainer, mcContainer]);
    resetQuizProperty();
    resetLevel();
    resetProgress();
    resetLevelProgress();
  }
  // Helper
  function getStyle(el, styleProp) {
    var value,
      defaultView = (el.ownerDocument || document).defaultView;
    if (defaultView && defaultView.getComputedStyle) {
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) {
      styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
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
  function emphasize(element, transitionTime = 100, scale = 1.3, scaleTime = 250) {
    scaleTime = parseInt(scaleTime);
    scale = parseFloat(scale);
    transitionTime = parseInt(transitionTime);
    let existingTransform = getStyle(element, "transform") || "";
    element.style.transition = `transform ${transitionTime}ms ease-in`;
    element.style.transform = existingTransform + " scale(1.1)";
    setTimeout(() => element.style.transform = existingTransform + ` scale(${scale})`, 50);
    setTimeout(() => element.style.transform = existingTransform + " scale(1)", scaleTime);
  }
  function incorrectMotion(element) {
    element.classList.add("incorrect");
    setTimeout(() => {
      element.classList.remove("incorrect");
    }, 500);
  }
  function quizModalReveal() {
    quizModal.style.visibility = "visible";
    quizModal.style.zIndex = "10";
    showHide([], [mainContainer]);
  }
  function quizModalHide() {
    quizModal.style.visibility = "hidden";
    quizModal.style.zIndex = "0";
    showHide([mainContainer]);
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
  async function checkQuizStatus() {
    if (quizStats.numAnswered == 1) {
      visibilityToggle(true, quizCurrScoreContainer);
    }
    if (quizStats.numAnswered >= quizStats.numQuestions) {
      console.log("show Modal");
      quizShowScore();
      await delay(1200);
      visibilityToggle(false, quizCurrScoreContainer);
      visibilityToggle(true, quizLastScoreContainer);
      finishQuiz();
    }
  }
  function finishQuiz() {
    quizLastScore.innerHTML = quizStats.numCorrect;
    resetQuizProperty();
    quizNewQuestion();
  }
  function quizUpdateAnswerHandler(e) {
    let userAnswer = e.target.value;
    console.log("userAnswer:", userAnswer);
    userValue = userAnswer;
  }
  function quizAnswerHandler(e) {
    let realAns = calculation(quizNumOne.innerHTML, quizNumTwo.innerHTML, quizOpOne.innerHTML);
    console.log("realAns: ", realAns);
    quizAnswerCheck(realAns == userValue);
    e.preventDefault();
  }
  flashContainer.addEventListener("mousedown", flashHandler, false);
  answerInput.addEventListener("input", gameUpdateAnswerHandler);
  answerSubmit.addEventListener("submit", gameCheckAnswerHandler);
  quizAnswerInput.addEventListener("input", quizUpdateAnswerHandler);
  quizAnswerForm.addEventListener("submit", quizAnswerHandler);
  for (let subject of subjects) {
    subject.addEventListener("click", toggleActivate);
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