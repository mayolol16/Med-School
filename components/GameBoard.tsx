import React from 'react';
import { Category, Question } from '../types';

interface GameBoardProps {
  data: Category[];
  onSelectQuestion: (question: Question) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ data, onSelectQuestion }) => {
  return (
    <div className="grid grid-cols-5 gap-2 p-4 bg-black border-4 border-yellow-400 rounded-lg shadow-lg">
      {/* Headers */}
      {data.map((category, index) => (
        <div
          key={index}
          className="bg-blue-800 text-yellow-300 font-bold text-center p-4 rounded h-28 flex items-center justify-center uppercase tracking-wider text-sm sm:text-base"
        >
          {category.title}
        </div>
      ))}

      {/* Questions */}
      {data.flatMap(category =>
        category.questions.map((question, qIndex) => (
          <div
            key={`${category.title}-${qIndex}`}
            onClick={() => !question.answered && onSelectQuestion(question)}
            className={`
              bg-blue-800 flex items-center justify-center rounded text-3xl sm:text-4xl font-extrabold h-24
              ${
                question.answered
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-yellow-400 cursor-pointer hover:bg-blue-700 transition-colors duration-200'
              }
            `}
          >
            {question.answered ? '' : `$${question.points}`}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
