export interface Question {
  question: string;
  answer: string;
  points: number;
  answered: boolean;
  imageUrl?: string;
  isDailyDouble?: boolean;
}

export interface Category {
  title: string;
  questions: Question[];
}

export interface Player {
  id: number;
  name: string;
  score: number;
}

// FIX: Defined the FinalJeopardyQuestion interface to correctly type the final jeopardy object.
export interface FinalJeopardyQuestion {
  question: string;
  answer: string;
}

export interface Game {
  title: string;
  description: string;
  jeopardy: Category[];
  doubleJeopardy: Category[];
  // FIX: Added finalJeopardy property to the Game interface to match the data structure.
  finalJeopardy: FinalJeopardyQuestion;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  explanation: string;
}
