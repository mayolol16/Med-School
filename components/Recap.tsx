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

  const playerStats = useMemo(() => {
    return players.map(player => {
      const playerHistory = history.filter(record => record.playerName === player.name);
      if (playerHistory.length === 0) {
        return {
          playerName: player.name,
          totalAnswered: 0,
          correct: 0,
          incorrect: 0,
          accuracy: 'N/A',
          bestCategory: 'N/A',
          worstCategory: 'N/A'
        };
      }

      const correct = playerHistory.filter(r => r.correct).length;
      const incorrect = playerHistory.length - correct;
      const accuracy = `${((correct / playerHistory.length) * 100).toFixed(0)}%`;

      const categoryPerformance = playerHistory.reduce((acc, record) => {
        if (!acc[record.category]) {
          acc[record.category] = { correct: 0, total: 0 };
        }
        acc[record.category].total++;
        if (record.correct) {
          acc[record.category].correct++;
        }
        return acc;
      }, {} as { [category: string]: { correct: number, total: number } });

      let bestCategory = 'N/A';
      let worstCategory = 'N/A';
      let maxAccuracy = -1;
      let minAccuracy = 101;

      // FIX: Replaced `Object.entries` with `Object.keys` to resolve type inference issues where `perf` was `unknown`.
      Object.keys(categoryPerformance).forEach((category) => {
        const perf = categoryPerformance[category];
        if (perf.total > 0) {
            const catAccuracy = (perf.correct / perf.total) * 100;
            if (catAccuracy >= maxAccuracy) {
                maxAccuracy = catAccuracy;
                bestCategory = category;
            }
            if (catAccuracy <= minAccuracy) {
                minAccuracy = catAccuracy;
                worstCategory = category;
            }
        }
      });
      
      if (bestCategory === worstCategory) {
          worstCategory = 'N/A';
      }

      return {
        playerName: player.name,
        totalAnswered: playerHistory.length,
        correct,
        incorrect,
        accuracy,
        bestCategory,
        worstCategory,
      };
    });
  }, [players, history]);


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
      
      {/* Performance Breakdown Section */}
      <div className="my-8">
        <h3 className="text-2xl font-semibold text-center mb-4">Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {playerStats.map((stats, index) => (
            <div key={index} className="bg-blue-900 p-4 rounded-lg border border-blue-700 flex flex-col">
              <h4 className="text-xl font-bold text-yellow-400 mb-3 text-center">{stats.playerName}</h4>
              {stats.totalAnswered > 0 ? (
                <div className="space-y-2 text-gray-300 flex-grow">
                  <div className="flex justify-between items-center">
                    <span>Accuracy:</span>
                    <span className="font-bold text-xl">{stats.accuracy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Correct / Incorrect:</span>
                    <span className="font-bold">
                      <span className="text-green-400">{stats.correct}</span> / <span className="text-red-400">{stats.incorrect}</span>
                    </span>
                  </div>
                  <div className="border-t border-blue-800 my-3"></div>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="font-semibold text-green-300">Strongest Category:</span>
                      <br/> 
                      <span className="pl-2">{stats.bestCategory}</span>
                    </p>
                    {stats.worstCategory !== 'N/A' && (
                        <p>
                          <span className="font-semibold text-red-300">Weakest Category:</span>
                          <br/> 
                          <span className="pl-2">{stats.worstCategory}</span>
                        </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center my-auto">No questions answered.</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {!recapData && !loading && history.length > 0 && (
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
          <h3 className="text-3xl font-bold text-center text-yellow-400 mb-6">AI Performance Review</h3>
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
