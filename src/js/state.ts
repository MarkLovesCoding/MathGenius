interface QuizStats {
  numQuestions: number;
  numAnswered: number;
  numCorrect: number;
}

interface DifficultyLevel {
  name: string;
  color: string;
}

interface User {
  id: string | null;
  profileImage: string | null;
  badges: string[];
}

interface McQuizActive {
  mcqNumAnswered: number;
  mcqFailedAttempts: number;
  mcqNumCorrect: number;
  mcqNumQuestion: number;
}

interface State {
  activeOperators: string[];
  activeHighVal: number;
  activeDifficulty: number;
  activeMultiplyHighVal: number;
  activeMultiplyLowVal: number;
  userValue: number | null;
  quizStats: QuizStats;
  high_score: number;
  difficultyLevels: Record<number, DifficultyLevel>;
  activity: string | null;
  mcQuizActive: McQuizActive;
  user: User;
}

export const state: State = {
  activeOperators: [],
  activeHighVal: 10,
  activeDifficulty: 1,
  activeMultiplyHighVal: 4,
  activeMultiplyLowVal: 0,
  userValue: null,
  quizStats: {
    numQuestions: 10,
    numAnswered: 0,
    numCorrect: 0,
  },
  high_score: 0,
  difficultyLevels: {
    1: { name: "Easy", color: "green" },
    2: { name: "Novice", color: "yellow" },
    3: { name: "Intermediate", color: "orange" },
    4: { name: "Advanced", color: "red" },
    5: { name: "Genius!", color: "purple" },
  },
  activity: null,
  mcQuizActive: {
    mcqNumAnswered: 0,
    mcqFailedAttempts: 0,
    mcqNumCorrect: 0,
    mcqNumQuestion: 10,
  },
  user: {
    id: null,
    profileImage: null,
    badges: [],
  },
};
