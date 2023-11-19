import type { QuestionElements } from "./types.js";


export const mainContainer = <HTMLElement>document.getElementById("main-container")

export const diffButtons = <NodeListOf<Element>>document.querySelectorAll(".diff-button")

export const subjects = <NodeListOf<Element>>document.querySelectorAll(".subject")

export const burger = <HTMLElement>document.getElementById("burger") ;
export const burgerContainer = <HTMLElement>document.getElementById("burger-container") ;

export const newGame = <HTMLElement>document.getElementById("new-game") ;
const gameNumOne = <HTMLElement>document.getElementById("game-first-number") ;
const gameNumTwo = <HTMLElement>document.getElementById("game-second-number") ;
const gameOpOne = <HTMLElement>document.getElementById("game-first-operator") ;
export const gameAnswerInput = <HTMLInputElement>document.getElementById("game-answer-input");
export const gameAnswerSubmit = <HTMLElement>document.getElementById("game-answer-form") ;
export const gameCorrectness = <HTMLElement>document.getElementById("game-correctness") ;
export const gameActual = <HTMLElement>document.getElementById("game-actual") ;
export const gameActualContainer = <HTMLDivElement>document.getElementById("game-actual-container");
export const gameCurrScore = <HTMLElement>document.getElementById("game-current-score") ;
export const gameHighScore = <HTMLElement>document.getElementById("game-current-high") ;
export const gameLevelNumber = <HTMLDivElement>document.getElementById("game-level-number");
export const gameTracker = <HTMLDivElement>document.getElementById("game-tracker");
// export const gameTracker2 = document.getElementById("game-tracker-2") ;
export const gameTrackerContainer = <HTMLElement>document.getElementById("game-tracker-container") ;
export const gameTrackerContainer2 = <HTMLElement>document.getElementById("game-tracker-container-2") ;

export const difficulty = <HTMLElement>document.getElementById("selected-difficulty-general") ;
export const difficultyContainer = <HTMLElement>document.getElementById("selected-difficulty-container-general") ;

export const quizAnswerForm = <HTMLFormElement>document.getElementById("quiz-answer-form");
export const newQuiz = <HTMLElement>document.getElementById("new-quiz");
const quizNumOne = <HTMLElement>document.getElementById("quiz-first-number");
const quizNumTwo = <HTMLElement>document.getElementById("quiz-second-number");
const quizOpOne = <HTMLElement>document.getElementById("quiz-first-operator");
export const quizAnswerInput = <HTMLInputElement>document.getElementById("quiz-answer-input")
export const quizCorrectness = <HTMLElement>document.getElementById("quiz-correctness");
export const quizAmountCorrect = <HTMLElement>document.getElementById("amountCorrect");
export const quizAmountCorrectPercentage = <HTMLElement>document.getElementById("amountCorrectPercentage");
export const quizCurrScore = <HTMLElement>document.getElementById("quiz-curr-score");
export const quizCurrQuestion = <HTMLElement>document.getElementById("quiz-curr-question");
export const quizCurrScoreContainer = <HTMLDivElement>document.querySelector(".quiz-curr-score-container");
export const quizLastScoreContainer = <HTMLDivElement>document.querySelector(".quiz-last-score-container");
export const quizLastScore = <HTMLElement>document.getElementById("quiz-last-score");
export const quizModal = <HTMLElement>document.getElementById("quiz-modal");

export const newMC = <HTMLElement>document.getElementById("new-mc") 
export const mcOptions = <HTMLElement>document.getElementById("mc-options")
const mcNumOne = <HTMLElement>document.getElementById("mc-first-number")
const mcNumTwo = <HTMLElement>document.getElementById("mc-second-number")
const mcOpOne = <HTMLElement>document.getElementById("mc-first-operator")

export const flashContainer = <HTMLElement>document.getElementById("flash-container")  
export const flashCard = <HTMLElement>document.getElementById("flash-card")  
export const newFlash = <HTMLElement>document.getElementById("new-flash")  
export const flashAnswer = <HTMLElement>document.getElementById("flash-answer")  
const flashNumOne = <HTMLElement>document.getElementById("flash-first-number")  
const flashNumTwo = <HTMLElement>document.getElementById("flash-second-number")  
const flashOpOne = <HTMLElement>document.getElementById("flash-first-operator")  

export const newMCQuiz = <HTMLElement>document.getElementById("new-mc-quiz") ;
export const mcQuizOptions = <HTMLElement>document.getElementById("mc-quiz-options") ;
const mcQuizNumOne = <HTMLElement>document.getElementById("mc-quiz-first-number") ;
const mcQuizNumTwo = <HTMLElement>document.getElementById("mc-quiz-second-number") ;
const mcQuizOpOne = <HTMLElement>document.getElementById("mc-quiz-first-operator") ;
export const carousel = <HTMLElement>document.querySelector('.fraction-carousel')











export const flashElements: QuestionElements = {
    numOne: flashNumOne,
    numTwo: flashNumTwo,
    opOne: flashOpOne,
};

export const mcElements: QuestionElements = {
    numOne: mcNumOne,
    numTwo: mcNumTwo,
    opOne: mcOpOne,
};

export const mcQuizElements: QuestionElements = {
    numOne: mcQuizNumOne,
    numTwo: mcQuizNumTwo,
    opOne: mcQuizOpOne,
};

export const quizElements: QuestionElements = {
    numOne: quizNumOne,
    numTwo: quizNumTwo,
    opOne: quizOpOne,
};

export const gameElements: QuestionElements = {
    numOne: gameNumOne,
    numTwo: gameNumTwo,
    opOne: gameOpOne,
};