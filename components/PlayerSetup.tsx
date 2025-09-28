import React from 'react';

interface PlayerSetupProps {
  onSetupComplete: (playerCount: number) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onSetupComplete }) => {
  const playerCounts = [1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center bg-gray-800 p-8 rounded-lg shadow-2xl border border-blue-500">
      <h2 className="text-4xl font-bold mb-8 text-yellow-300">How Many Players?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {playerCounts.map(count => (
          <button
            key={count}
            onClick={() => onSetupComplete(count)}
            className="w-32 h-32 flex items-center justify-center text-4xl font-bold rounded-lg bg-blue-700 text-yellow-300 transition-transform transform hover:scale-110 hover:bg-blue-600 shadow-lg"
          >
            {count}
          </button>
        ))}
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

export default PlayerSetup;
