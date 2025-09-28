import React, { useState, useMemo } from 'react';
import { Player, PerformanceRecord, RecapData } from '../types';
import { generateRecap } from '../services/geminiService';
import { SpinnerIcon } from './Icons';

interface RecapProps {
  players: Player[];
  history: PerformanceRecord[];
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const Recap: React.FC<RecapProps> = ({ players, history, onPlayAgain, onNewGame }) => {
  const [loading, setLoading] = useState(false);
  const [recapData, setRecapData] = useState<RecapData | null>(null);

  const sortedPlayers = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players]);
  const winner = sortedPlayers[0];

  const handleGenerateRecap = async () => {
    setLoading(true);
    const data = await generateRecap(history);
    setRecapData(data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl border border-blue-500 animate-fade-in">
      <h2 className="text-5xl font-bold text-center text-yellow-300 mb-4">Game Over!</h2>
      
      {winner && (
        <p className="text-3xl text-center text-white mb-8">
          Congratulations, <span className="font-bold text-green-400">{winner.name}</span>!
        </p>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-center mb-4">Final Scores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedPlayers.map(player => (
            <div key={player.id} className="bg-blue-800 p-4 rounded-lg text-center">
              <div className="text-lg font-bold truncate">{player.name}</div>
              <div className={`text-3xl font-extrabold ${player.score < 0 ? 'text-red-500' : 'text-white'}`}>
                ${player.score}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!recapData && !loading && (
        <div className="text-center my-8">
          <button
            onClick={handleGenerateRecap}
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 text-xl shadow-lg"
          >
            Generate AI Performance Review
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center my-8">
          <SpinnerIcon />
          <p className="mt-4 text-xl text-gray-300">Generating your performance review...</p>
        </div>
      )}

      {recapData && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 my-8 animate-fade-in">
          <h3 className="text-3xl font-bold text-center text-yellow-400 mb-6">Performance Review</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="text-xl font-semibold text-green-400 mb-2 border-b-2 border-green-400 pb-1">Strengths</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {recapData.strengths.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-red-400 mb-2 border-b-2 border-red-400 pb-1">Weaknesses</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {recapData.weaknesses.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-2 border-b-2 border-blue-400 pb-1">Topics to Review</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {recapData.reviewTopics.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Play Same Game Again
        </button>
        <button
          onClick={onNewGame}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Choose a New Game
        </button>
      </div>

       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
       `}</style>
    </div>
  );
};

export default Recap;
