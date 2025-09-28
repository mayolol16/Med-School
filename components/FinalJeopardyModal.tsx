import React, { useState, useEffect, useRef } from 'react';
import { Player, FinalJeopardyQuestion, AnswerFeedback } from '../types';
import { checkAnswer } from '../services/geminiService';
import { SpinnerIcon } from './Icons';

type Step = 'wager' | 'question' | 'checking' | 'reveal';

interface FinalJeopardyModalProps {
  players: Player[];
  question: FinalJeopardyQuestion;
  onFinish: (finalPlayers: Player[]) => void;
  playSound: (sound: 'thinking' | 'stopThinking' | 'theme' | 'stopTheme' | 'correct' | 'incorrect') => void;
  useAI: boolean;
}

const FinalJeopardyModal: React.FC<FinalJeopardyModalProps> = ({ players, question, onFinish, playSound, useAI }) => {
  const [step, setStep] = useState<Step>('wager');
  const [wagers, setWagers] = useState<{ [key: number]: string }>({});
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: AnswerFeedback | null }>({});
  const [manualCorrectness, setManualCorrectness] = useState<{ [key: number]: boolean | null }>({});
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    playSound('stopTheme');
    const initialCorrectness: { [key: number]: null } = {};
    players.forEach(p => {
        if (p.score > 0) {
            initialCorrectness[p.id] = null
        }
    });
    setManualCorrectness(initialCorrectness);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('stopThinking');
    };
  }, []);

  const handleWagerChange = (playerId: number, value: string) => {
    setWagers(prev => ({ ...prev, [playerId]: value }));
  };

  const handleLockWagers = () => {
    let allValid = true;
    players.forEach(p => {
        if (p.score <= 0) return;
        const wagerNum = Number(wagers[p.id] || 0);
        if (wagerNum < 0 || wagerNum > p.score) {
            alert(`${p.name}'s wager must be between $0 and their current score of $${p.score}.`);
            allValid = false;
        }
    });

    if(allValid) {
        setStep('question');
        startTimer();
    }
  };

  const startTimer = () => {
    setTimer(30);
    playSound('thinking');
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleCheckAnswers();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerChange = (playerId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [playerId]: value }));
  };

  const handleCheckAnswers = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('stopThinking');
    
    if (useAI) {
        setStep('checking');
        const eligiblePlayers = players.filter(p => p.score > 0);
        const feedbackPromises = eligiblePlayers.map(p => 
            checkAnswer(question.question, question.answer, answers[p.id] || 'No answer')
        );
        const results = await Promise.all(feedbackPromises);
        
        const newFeedback: { [key: number]: AnswerFeedback } = {};
        results.forEach((res, index) => {
            const player = eligiblePlayers[index];
            newFeedback[player.id] = res;
        });

        setFeedback(newFeedback);
    }
    setStep('reveal');
  };
  
  const handleManualCorrectnessChange = (playerId: number, isCorrect: boolean) => {
    setManualCorrectness(prev => ({ ...prev, [playerId]: isCorrect }));
  };

  const handleFinishGame = () => {
    const finalPlayers = players.map(p => {
        if (p.score <= 0) return p;

        const wager = Number(wagers[p.id] || 0);
        const isCorrect = useAI ? (feedback[p.id]?.isCorrect || false) : (manualCorrectness[p.id] || false);
        const scoreChange = isCorrect ? wager : -wager;
        
        return { ...p, score: p.score + scoreChange };
    });
    onFinish(finalPlayers);
  };
  
  const allPlayersJudged = Object.values(manualCorrectness).every(status => status !== null);

  const renderWager = () => (
    <div className="animate-fade-in">
        <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 mb-4">FINAL JEOPARDY!</h2>
        <div className="text-2xl mb-8 p-4 bg-black rounded-lg">CATEGORY: <span className="font-bold text-white">{question.category || "General Microbiology"}</span></div>
        <p className="text-xl mb-6">Enter your wagers. Only players with a positive score can wager.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {players.map(player => (
                <div key={player.id} className={`bg-blue-800 p-4 rounded-lg ${player.score <= 0 ? 'opacity-50' : ''}`}>
                    <label className="block text-lg font-bold text-yellow-400 mb-2">{player.name} (Score: ${player.score})</label>
                    <input
                        type="number"
                        value={wagers[player.id] || ''}
                        onChange={(e) => handleWagerChange(player.id, e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-xl text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder={player.score <=0 ? 'Ineligible' : 'Enter wager...'}
                        max={player.score > 0 ? player.score : 0}
                        min="0"
                        autoFocus={player.id === 1}
                        disabled={player.score <= 0}
                    />
                </div>
            ))}
        </div>
        <button onClick={handleLockWagers} className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">Lock In Wagers</button>
    </div>
  );

  const renderQuestion = () => (
    <div className="animate-fade-in flex flex-col justify-between min-h-[50vh]">
      <div>
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-yellow-300">Question</h2>
            <div className="text-4xl font-bold text-red-500">{timer}</div>
        </div>
        <p className="text-2xl sm:text-3xl text-white mb-8">{question.question}</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {players.map(player => (
                <div key={player.id} className={`bg-blue-800 p-4 rounded-lg ${player.score <= 0 ? 'opacity-50' : ''}`}>
                    <label className="block text-lg font-bold text-yellow-400 mb-2">{player.name}'s Answer:</label>
                    <input
                        type="text"
                        value={answers[player.id] || ''}
                        onChange={(e) => handleAnswerChange(player.id, e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-lg text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder={player.score <= 0 ? 'Ineligible' : 'Type your answer here...'}
                        autoFocus={player.id === 1}
                        disabled={player.score <= 0}
                    />
                </div>
            ))}
        </div>
        <button onClick={handleCheckAnswers} className="mt-8 px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">Submit Answers</button>
      </div>
    </div>
  );
  
  const renderChecking = () => (
     <div className="flex flex-col items-center justify-center min-h-[50vh]">
       <SpinnerIcon />
       <p className="mt-4 text-2xl text-gray-300">Revealing the correct answer and checking...</p>
     </div>
  );
  
  const renderAIReveal = () => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map(player => {
                if (player.score <= 0) {
                    return (
                        <div key={player.id} className="p-4 rounded-lg border-2 border-gray-600 bg-gray-800/50 opacity-60">
                            <h3 className="text-xl font-bold text-yellow-400">{player.name}</h3>
                            <p className="text-gray-400">Did not participate.</p>
                        </div>
                    )
                }
                const playerFeedback = feedback[player.id];
                const playerWager = Number(wagers[player.id] || 0);
                const scoreChange = playerFeedback?.isCorrect ? `+ $${playerWager}` : `- $${playerWager}`;
                return (
                    <div key={player.id} className={`p-4 rounded-lg border-2 ${playerFeedback?.isCorrect ? 'border-green-500 bg-green-900/50' : 'border-red-500 bg-red-900/50'}`}>
                        <h3 className="text-xl font-bold text-yellow-400">{player.name}</h3>
                        <p className="text-gray-300">Answered: "{answers[player.id] || 'No answer'}"</p>
                        <p className={`text-2xl font-bold ${playerFeedback?.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{playerFeedback?.isCorrect ? 'Correct!' : 'Incorrect'}</p>
                        <p className="text-lg">Score change: <span className="font-bold">{scoreChange}</span></p>
                    </div>
                )
            })}
        </div>
        <button onClick={handleFinishGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Finish Game & View Recap</button>
    </>
  )

  const renderManualReveal = () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map(player => {
                if (player.score <= 0) {
                     return (
                        <div key={player.id} className="p-4 rounded-lg border-2 border-gray-600 bg-gray-800/50 opacity-60">
                            <h3 className="text-xl font-bold text-yellow-400">{player.name}</h3>
                            <p className="text-gray-400">Did not participate.</p>
                        </div>
                    )
                }
                const correctness = manualCorrectness[player.id];
                return (
                    <div key={player.id} className={`p-4 rounded-lg border-2 ${correctness === null ? 'border-gray-500' : correctness ? 'border-green-500 bg-green-900/50' : 'border-red-500 bg-red-900/50'}`}>
                        <h3 className="text-xl font-bold text-yellow-400">{player.name}</h3>
                        <p className="text-gray-300 mb-2">Answered: "{answers[player.id] || 'No answer'}"</p>
                        {correctness === null ? (
                          <div className="flex justify-center gap-2 mt-2">
                             <button onClick={() => handleManualCorrectnessChange(player.id, true)} className="px-4 py-1 bg-green-600 text-white font-bold rounded hover:bg-green-700">Correct</button>
                             <button onClick={() => handleManualCorrectnessChange(player.id, false)} className="px-4 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700">Incorrect</button>
                          </div>
                        ) : (
                           <p className={`text-2xl font-bold ${correctness ? 'text-green-400' : 'text-red-400'}`}>{correctness ? 'Correct!' : 'Incorrect'}</p>
                        )}
                    </div>
                )
            })}
        </div>
        <button 
          onClick={handleFinishGame} 
          disabled={!allPlayersJudged}
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            Finish Game & View Recap
        </button>
      </>
  )


  const renderReveal = () => (
    <div className="animate-fade-in">
        <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 mb-4">The Results</h2>
        <p className="text-xl text-white mb-2">The correct answer was:</p>
        <p className="text-3xl text-green-400 font-bold mb-8 p-4 bg-black rounded-lg">{question.answer}</p>
        {useAI ? renderAIReveal() : renderManualReveal()}
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 'wager': return renderWager();
      case 'question': return renderQuestion();
      case 'checking': return renderChecking();
      case 'reveal': return renderReveal();
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-blue-900 border-4 border-yellow-400 rounded-lg shadow-2xl w-full max-w-5xl text-center p-8 relative transform transition-all duration-300 scale-95 animate-scale-in">
        {renderContent()}
      </div>
       <style>{`
          @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
          @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
       `}</style>
    </div>
  );
};

export default FinalJeopardyModal;