
export type QuizStats = {
    numQuestions: number;
    numAnswered: number;
    numCorrect: number;
}

export type QuestionElements = {
    numOne: HTMLElement,
    numTwo: HTMLElement,
    opOne: HTMLElement
}
export type DifficultyLevel = {
    name: string;
    color: string;
}

export type Badges = {
    [operator: string]: {
        [type: string]: {
            [diff: string]: boolean;
        };
    };
}
export type Operator = "+"|"-"|"x"|"÷"