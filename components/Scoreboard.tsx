import React from 'react';
import { Player } from '../types';

interface ScoreboardProps {
  players: Player[];
  activePlayerId: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, activePlayerId }) => {
  return (
    <div className={`grid grid-cols-${players.length} gap-4 sm:gap-6 mb-6 justify-center`}>
      {players.map(player => (
        <div
          key={player.id}
          className={`
            p-4 rounded-lg text-center transition-all duration-300
            ${activePlayerId === player.id ? 'bg-yellow-400 text-gray-900 shadow-lg scale-105' : 'bg-blue-800 text-white'}
          `}
        >
          <div className="text-lg font-bold truncate">{player.name}</div>
          <div className={`text-3xl font-extrabold ${player.score < 0 ? 'text-red-500' : ''}`}>
            ${player.score}
          </div>
        </div>
      ))}
       <style>{`
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      `}</style>
    </div>
  );
};

export default Scoreboard;