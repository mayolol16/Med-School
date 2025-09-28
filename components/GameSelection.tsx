import React from 'react';
import { Game } from '../types';

interface GameSelectionProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onBack: () => void;
  useAI: boolean;
  onToggleAI: (useAI: boolean) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ games, onSelectGame, onBack, useAI, onToggleAI }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-2xl border border-blue-500">
      <h2 className="text-3xl font-bold mb-6 text-yellow-300">Choose a Game Board</h2>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="text-xl text-gray-300">Use AI Answer Checking</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useAI}
            onChange={(e) => onToggleAI(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {games.map((game, index) => (
          <div key={index} className="bg-blue-900 p-6 rounded-lg shadow-lg flex flex-col justify-between border border-blue-600 hover:border-yellow-400 transition-all duration-300">
            <div>
              <h3 className="text-xl font-semibold text-yellow-400">{game.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{game.description}</p>
            </div>
            <button
              onClick={() => onSelectGame(game)}
              className="mt-6 w-full px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-md"
            >
              Play Game
            </button>
          </div>
        ))}
      </div>
       <button
          onClick={onBack}
          className="mt-8 px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          &larr; Back to Player Select
       </button>
    </div>
  );
};

export default GameSelection;