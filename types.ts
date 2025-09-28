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
  category?: string; // Optional category title
}

export interface Game {
  title:string;
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

export interface PerformanceRecord {
  playerName: string;
  category: string;
  question: string;
  correct: boolean;
  correctAnswer: string;
}

export interface RecapData {
  strengths: string[];
  weaknesses: string[];
  reviewTopics: string[];
}
