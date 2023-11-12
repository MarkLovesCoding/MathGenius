

export const mainContainer: HTMLElement | null = document.getElementById("main-container");

export const diffButtons: NodeListOf<Element> = document.querySelectorAll(".diff-button");

export const subjects: NodeListOf<Element> = document.querySelectorAll(".subject");

export const burger: HTMLElement | null = document.getElementById("burger");
export const burgerContainer: HTMLElement | null = document.getElementById("burger-container");

export const newGame: HTMLElement | null = document.getElementById("new-game");
 const gameNumOne: HTMLElement | null = document.getElementById("game-first-number");
 const gameNumTwo: HTMLElement | null = document.getElementById("game-second-number");
 const gameOpOne: HTMLElement | null = document.getElementById("game-first-operator");
export const gameAnswerInput: HTMLElement | null = document.getElementById("game-answer-input");
export const gameAnswerSubmit: HTMLElement | null = document.getElementById("game-answer-form");
export const gameCorrectness: HTMLElement | null = document.getElementById("game-correctness");
export const gameActual: HTMLElement | null = document.getElementById("game-actual");
export const gameActualContainer: HTMLElement | null = document.getElementById("game-actual-container");
export const gameCurrScore: HTMLElement | null = document.getElementById("game-current-score");
export const gameHighScore: HTMLElement | null = document.getElementById("game-current-high");
export const gameLevelNumber: HTMLElement | null = document.getElementById("game-level-number");
export const gameTracker: HTMLElement | null = document.getElementById("game-tracker");
export const gameTracker2: HTMLElement | null = document.getElementById("game-tracker-2");
export const gameTrackerContainer: HTMLElement | null = document.getElementById("game-tracker-container");
export const gameTrackerContainer2: HTMLElement | null = document.getElementById("game-tracker-container-2");

export const difficulty: HTMLElement | null = document.getElementById("selected-difficulty-general");
export const difficultyContainer: HTMLElement | null = document.getElementById("selected-difficulty-container-general");

export const quizAnswerForm: HTMLElement | null = document.getElementById("quiz-answer-form");
export const newQuiz: HTMLElement | null = document.getElementById("new-quiz");
 const quizNumOne: HTMLElement | null = document.getElementById("quiz-first-number");
 const quizNumTwo: HTMLElement | null = document.getElementById("quiz-second-number");
 const quizOpOne: HTMLElement | null = document.getElementById("quiz-first-operator");
export const quizAnswerInput: HTMLElement | null = document.getElementById("quiz-answer-input");
export const quizCorrectness: HTMLElement | null = document.getElementById("quiz-correctness");
export const quizAmountCorrect: HTMLElement | null = document.getElementById("amountCorrect");
export const quizAmountCorrectPercentage: HTMLElement | null = document.getElementById("amountCorrectPercentage");
export const quizCurrScore: HTMLElement | null = document.getElementById("quiz-curr-score");
export const quizCurrQuestion: HTMLElement | null = document.getElementById("quiz-curr-question");
export const quizCurrScoreContainer: HTMLElement | null = document.querySelector(".quiz-curr-score-container");
export const quizLastScoreContainer: HTMLElement | null = document.querySelector(".quiz-last-score-container");
export const quizLastScore: HTMLElement | null = document.getElementById("quiz-last-score");
export const quizModal: HTMLElement | null = document.getElementById("quiz-modal");

export const newMC: HTMLElement | null = document.getElementById("new-mc");
export const mcOptions: HTMLElement | null = document.getElementById("mc-options");
 const mcNumOne: HTMLElement | null = document.getElementById("mc-first-number");
 const mcNumTwo: HTMLElement | null = document.getElementById("mc-second-number");
 const mcOpOne: HTMLElement | null = document.getElementById("mc-first-operator");

export const flashContainer: HTMLElement | null = document.getElementById("flash-container");
export const flashCard: HTMLElement | null = document.getElementById("flash-card");
export const newFlash: HTMLElement | null = document.getElementById("new-flash");
export const flashAnswer: HTMLElement | null = document.getElementById("flash-answer");
 const flashNumOne: HTMLElement | null = document.getElementById("flash-first-number");
 const flashNumTwo: HTMLElement | null = document.getElementById("flash-second-number");
 const flashOpOne: HTMLElement | null = document.getElementById("flash-first-operator");

export const newMCQuiz: HTMLElement | null = document.getElementById("new-mc-quiz");
export const mcQuizOptions: HTMLElement | null = document.getElementById("mc-quiz-options");
 const mcQuizNumOne: HTMLElement | null = document.getElementById("mc-quiz-first-number");
 const mcQuizNumTwo: HTMLElement | null = document.getElementById("mc-quiz-second-number");
 const mcQuizOpOne: HTMLElement | null = document.getElementById("mc-quiz-first-operator");


interface QuestionElements {
    numOne:HTMLElement|null,
    numTwo:HTMLElement|null,
    opOne:HTMLElement|null
}



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