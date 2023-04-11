export const state = {

    activeOperators: [],
    activeHighVal:10,
    activeDifficulty:1,
    activeMultiplyHighVal:4,
    activeMultiplyLowVal:0,
    userValue:null,
    quizStats: {  numQuestions: 10,
    numAnswered: 0,
    numCorrect: 0},
    high_score:0,
    difficultyLevels:{
        1: { name: "Easy", color: "green" },
        2: { name: "Novice", color: "yellow" },
        3: { name: "Intermediate", color: "orange" },
        4: { name: "Advanced", color: "red" },
        5: { name: "Genius!", color: "purple" }
      },
    activity:null,
    mcQuizActive:{
      mcqNumAnswered:0,
      mcqFailedAttempts:0,
      mcqNumCorrect:0,
      mcqNumQuestion:10
    }
}