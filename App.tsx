import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Category, Player, Question, Game } from './types';
import GameBoard from './components/GameBoard';
import QuestionModal from './components/QuestionModal';
import Scoreboard from './components/Scoreboard';
import { games } from './data/games';
import GameSelection from './components/GameSelection';
import { checkAnswer } from './services/geminiService';
import PlayerSetup from './components/PlayerSetup';

type GameStage = 'playerSetup' | 'gameSelection' | 'gameplay';

const App: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>('playerSetup');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Category[] | null>(null);
  const [round, setRound] = useState<'jeopardy' | 'doubleJeopardy'>('jeopardy');
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  const themeAudioRef = useRef<HTMLAudioElement | null>(null);
  const thinkingAudioRef = useRef<HTMLAudioElement | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    themeAudioRef.current = document.getElementById('theme-music') as HTMLAudioElement;
    thinkingAudioRef.current = document.getElementById('thinking-music') as HTMLAudioElement;
    correctAudioRef.current = document.getElementById('correct-sound') as HTMLAudioElement;
    incorrectAudioRef.current = document.getElementById('incorrect-sound') as HTMLAudioElement;
  }, []);
  
  const playSound = (sound: 'theme' | 'correct' | 'incorrect' | 'thinking' | 'stopTheme' | 'stopThinking') => {
    switch (sound) {
      case 'theme': themeAudioRef.current?.play(); break;
      case 'stopTheme': themeAudioRef.current?.pause(); if(themeAudioRef.current) themeAudioRef.current.currentTime = 0; break;
      case 'correct': correctAudioRef.current?.play(); break;
      case 'incorrect': incorrectAudioRef.current?.play(); break;
      case 'thinking': thinkingAudioRef.current?.play(); break;
      case 'stopThinking': thinkingAudioRef.current?.pause(); if(thinkingAudioRef.current) thinkingAudioRef.current.currentTime = 0; break;
    }
  };

  const handlePlayerSetup = (playerCount: number) => {
    const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      score: 0,
    }));
    setPlayers(newPlayers);
    setActivePlayer(newPlayers[0]);
    setGameStage('gameSelection');
    playSound('theme');
  };

  const handleSelectGame = (game: Game) => {
    const freshGame = JSON.parse(JSON.stringify(game));
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setActivePlayer(players[0]);
    setSelectedGame(freshGame);
    setCurrentBoard(freshGame.jeopardy);
    setRound('jeopardy');
    setGameStage('gameplay');
    playSound('stopTheme');
  };
  
  const handleSelectQuestion = (question: Question) => {
    if (!question.answered) {
      setCurrentQuestion(question);
    }
  };

  const handleCloseModal = () => {
    setCurrentQuestion(null);
    playSound('stopThinking');
  };

  const handleAnswer = (correct: boolean, wager: number) => {
    if (currentQuestion) {
      const points = currentQuestion.isDailyDouble ? wager : currentQuestion.points;
      
      if(correct) playSound('correct');
      else playSound('incorrect');

      setPlayers(prevPlayers =>
        prevPlayers.map(p =>
          p.id === activePlayer!.id
            ? { ...p, score: p.score + (correct ? points : -points) }
            : p
        )
      );
      
      setCurrentBoard(prevBoard =>
        prevBoard!.map(category => ({
          ...category,
          questions: category.questions.map(q =>
            q.question === currentQuestion.question && q.points === currentQuestion.points
             ? { ...q, answered: true } 
             : q
          ),
        }))
      );
      
      const nextPlayerIndex = (activePlayer!.id % players.length);
      setActivePlayer(players[nextPlayerIndex]);

      handleCloseModal();
    }
  };

  const backToSelection = () => {
    setSelectedGame(null);
    setCurrentBoard(null);
    setCurrentQuestion(null);
    setGameStage('gameSelection');
    playSound('theme');
  };
  
  const backToPlayerSetup = () => {
    backToSelection();
    setGameStage('playerSetup');
    playSound('stopTheme');
  }

  const startDoubleJeopardy = () => {
    if (selectedGame) {
      setCurrentBoard(selectedGame.doubleJeopardy);
      setRound('doubleJeopardy');
    }
  };

  const isRoundComplete = useMemo(() => {
    if (!currentBoard) return false;
    return currentBoard.every(cat => cat.questions.every(q => q.answered));
  }, [currentBoard]);
  
  const renderGameStage = () => {
    switch (gameStage) {
      case 'playerSetup':
        return <PlayerSetup onSetupComplete={handlePlayerSetup} />;
      case 'gameSelection':
        return <GameSelection games={games} onSelectGame={handleSelectGame} onBack={backToPlayerSetup} />;
      case 'gameplay':
        return (
          <div>
            <Scoreboard players={players} activePlayerId={activePlayer!.id} />
            <GameBoard data={currentBoard!} onSelectQuestion={handleSelectQuestion} />
            <div className="text-center mt-8 flex justify-center items-center gap-4">
                <button 
                  onClick={backToSelection}
                  className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Change Game
                </button>
                {isRoundComplete && round === 'jeopardy' && (
                  <button 
                    onClick={startDoubleJeopardy}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 animate-pulse"
                  >
                    Start Double Jeopardy!
                  </button>
                )}
            </div>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl text-center mb-6">
        <h1 className="text-5xl font-bold tracking-wider text-yellow-400" style={{ textShadow: '2px 2px 4px #000000' }}>
          Microbiology Jeopardy Pro
        </h1>
         {selectedGame && (
          <h2 className="text-2xl mt-2 text-blue-300 font-semibold capitalize">
            {round.replace(/([A-Z])/g, ' $1')} Round
          </h2>
        )}
      </header>

      <main className="w-full max-w-7xl flex-grow">
        {renderGameStage()}
      </main>

      {currentQuestion && activePlayer && (
        <QuestionModal
          question={currentQuestion}
          onClose={handleCloseModal}
          onAnswer={handleAnswer}
          checkAnswer={checkAnswer}
          activePlayer={activePlayer}
          playSound={playSound}
        />
      )}
    </div>
  );
};

export default App;