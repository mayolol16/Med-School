import { GoogleGenAI, Type } from '@google/genai';
import { AnswerFeedback, PerformanceRecord, RecapData } from '../types';

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

const recapSchema = {
    type: Type.OBJECT,
    properties: {
        strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of topics or categories the player seems to understand well."
        },
        weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of topics or categories where the player struggled."
        },
        reviewTopics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of specific concepts to review, based on incorrectly answered questions."
        }
    },
    required: ['strengths', 'weaknesses', 'reviewTopics']
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


export const generateRecap = async (history: PerformanceRecord[]): Promise<RecapData> => {
    if (history.length === 0) {
        return {
            strengths: ["No questions were answered."],
            weaknesses: ["No questions were answered."],
            reviewTopics: ["Play a game to get a performance review!"]
        };
    }

    const formattedHistory = history.map(record => 
        `Player: ${record.playerName}, Category: "${record.category}", Question: "${record.question}", Correct Answer: "${record.correctAnswer}", Correct: ${record.correct}`
    ).join('\n');

    const prompt = `
    You are an expert microbiology professor and tutor. You are analyzing a student's performance in a Jeopardy game to provide constructive feedback.
    Based on the following game history, identify the player's strengths, weaknesses, and create a targeted list of topics they should review.

    Game History:
    ${formattedHistory}

    Analysis Instructions:
    1.  **Strengths**: Identify 2-3 categories or concepts where the player(s) consistently answered correctly. List these as bullet points.
    2.  **Weaknesses**: Identify 2-3 categories or concepts where the player(s) frequently answered incorrectly. List these as bullet points.
    3.  **Review Topics**: Based *only* on the questions answered incorrectly, create a concise list of 3-5 specific microbiological concepts the student should review. Do not invent new topics.
    
    Provide your response as a valid JSON object. Be encouraging but direct in your feedback.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: recapSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const parsedData: RecapData = JSON.parse(jsonText);
        return parsedData;

    } catch (error) {
        console.error("Error generating recap with Gemini:", error);
        return {
            strengths: ["Could not determine strengths due to an error."],
            weaknesses: ["Could not determine weaknesses due to an error."],
            reviewTopics: ["Unable to generate review topics at this time. Please try again later."]
        };
    }
};
