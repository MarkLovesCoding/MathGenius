import type { QuestionElements } from "./types.js";


export const mainContainer = <HTMLElement>document.getElementById("main-container")

export const diffButtons = document.querySelectorAll(".diff-button")  as NodeListOf<Element>

export const subjects = document.querySelectorAll(".subject") as NodeListOf<Element>

export const burger = document.getElementById("burger")  as HTMLElement;
export const burgerContainer = document.getElementById("burger-container")  as HTMLElement;

export const newGame = document.getElementById("new-game")  as HTMLElement;
const gameNumOne = document.getElementById("game-first-number")  as HTMLElement;
const gameNumTwo = document.getElementById("game-second-number")  as HTMLElement;
const gameOpOne = document.getElementById("game-first-operator")  as HTMLElement;
export const gameAnswerInput = document.getElementById("game-answer-input")  as HTMLInputElement;
export const gameAnswerSubmit = document.getElementById("game-answer-form")  as HTMLElement;
export const gameCorrectness = document.getElementById("game-correctness")  as HTMLElement;
export const gameActual = document.getElementById("game-actual")  as HTMLElement;
export const gameActualContainer = document.getElementById("game-actual-container")  as HTMLDivElement;
export const gameCurrScore = document.getElementById("game-current-score")  as HTMLElement;
export const gameHighScore = document.getElementById("game-current-high")  as HTMLElement;
export const gameLevelNumber = document.getElementById("game-level-number")  as HTMLDivElement;
export const gameTracker = document.getElementById("game-tracker")  as HTMLDivElement;
// export const gameTracker2 = document.getElementById("game-tracker-2")  as HTMLElement;
export const gameTrackerContainer = document.getElementById("game-tracker-container")  as HTMLElement;
export const gameTrackerContainer2 = document.getElementById("game-tracker-container-2")  as HTMLElement;

export const difficulty = document.getElementById("selected-difficulty-general")  as HTMLElement;
export const difficultyContainer = document.getElementById("selected-difficulty-container-general")  as HTMLElement;

export const quizAnswerForm = document.getElementById("quiz-answer-form") as HTMLFormElement;
export const newQuiz = document.getElementById("new-quiz") as HTMLElement;
const quizNumOne = document.getElementById("quiz-first-number") as HTMLElement;
const quizNumTwo = document.getElementById("quiz-second-number") as HTMLElement;
const quizOpOne = document.getElementById("quiz-first-operator") as HTMLElement;
export const quizAnswerInput = document.getElementById("quiz-answer-input") as HTMLInputElement
export const quizCorrectness = document.getElementById("quiz-correctness") as HTMLElement;
export const quizAmountCorrect = document.getElementById("amountCorrect") as HTMLElement;
export const quizAmountCorrectPercentage = document.getElementById("amountCorrectPercentage") as HTMLElement;
export const quizCurrScore = document.getElementById("quiz-curr-score") as HTMLElement;
export const quizCurrQuestion = document.getElementById("quiz-curr-question") as HTMLElement;
export const quizCurrScoreContainer = document.querySelector(".quiz-curr-score-container") as HTMLDivElement;
export const quizLastScoreContainer = document.querySelector(".quiz-last-score-container") as HTMLDivElement;
export const quizLastScore = document.getElementById("quiz-last-score") as HTMLElement;
export const quizModal = document.getElementById("quiz-modal") as HTMLElement;

export const newMC = document.getElementById("new-mc")  as HTMLElement
export const mcOptions = document.getElementById("mc-options") as HTMLElement
const mcNumOne = document.getElementById("mc-first-number") as HTMLElement
const mcNumTwo = document.getElementById("mc-second-number") as HTMLElement
const mcOpOne = document.getElementById("mc-first-operator") as HTMLElement

export const flashContainer = <HTMLElement>document.getElementById("flash-container")  
export const flashCard = <HTMLElement>document.getElementById("flash-card")  
export const newFlash = <HTMLElement>document.getElementById("new-flash")  
export const flashAnswer = <HTMLElement>document.getElementById("flash-answer")  
const flashNumOne = <HTMLElement>document.getElementById("flash-first-number")  
const flashNumTwo = <HTMLElement>document.getElementById("flash-second-number")  
const flashOpOne = <HTMLElement>document.getElementById("flash-first-operator")  

export const newMCQuiz = document.getElementById("new-mc-quiz")  as HTMLElement;
export const mcQuizOptions = document.getElementById("mc-quiz-options")  as HTMLElement;
const mcQuizNumOne = document.getElementById("mc-quiz-first-number")  as HTMLElement;
const mcQuizNumTwo = document.getElementById("mc-quiz-second-number")  as HTMLElement;
const mcQuizOpOne = document.getElementById("mc-quiz-first-operator")  as HTMLElement;
export const carousel = document.querySelector('.fraction-carousel') as HTMLElement











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