import { GoogleGenAI, Type } from '@google/genai';
import { AnswerFeedback } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const answerSchema = {
  type: Type.OBJECT,
  properties: {
    isCorrect: { 
      type: Type.BOOLEAN,
      description: 'Whether the user\'s answer is considered correct.'
    },
    explanation: { 
      type: Type.STRING,
      description: 'A brief explanation for why the answer is correct or incorrect.'
    },
  },
  required: ['isCorrect', 'explanation'],
};


export const checkAnswer = async (question: string, correctAnswer: string, userAnswer: string): Promise<AnswerFeedback> => {
  const prompt = `
  You are an expert microbiology professor evaluating a student's answer in a Jeopardy game.
  The category clue (the "question") is: "${question}"
  The correct response (the "answer") is: "${correctAnswer}"
  The student's submitted answer is: "${userAnswer}"

  Evaluate if the student's answer is correct. Be lenient with minor typos, formatting (e.g., "What is Staph aureus?" vs "staphylococcus aureus"), and common abbreviations. The answer does not need to be in the form of a question.

  Your response must be a valid JSON object with two fields:
  1. "isCorrect": A boolean (true if the user's answer is correct, false otherwise).
  2. "explanation": A concise string (max 20 words) explaining why the answer is correct, or what the correct answer was if it was incorrect.
  `;

  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: answerSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: AnswerFeedback = JSON.parse(jsonText);
    return parsedData;

  } catch (error) {
    console.error("Error checking answer with Gemini:", error);
    // Fallback in case of API error
    return {
      isCorrect: false,
      explanation: "Sorry, I couldn't verify the answer at this time."
    };
  }
};
