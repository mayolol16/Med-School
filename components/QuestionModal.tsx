import React, { useState, useEffect, useRef } from 'react';
import { Question, AnswerFeedback, Player } from '../types';
import { SpinnerIcon } from './Icons';

type ModalState = 'dailyDoubleWager' | 'question' | 'checking' | 'feedback';

interface QuestionModalProps {
  question: Question;
  activePlayer: Player;
  onClose: () => void;
  onAnswer: (correct: boolean, wager: number) => void;
  checkAnswer: (question: string, correctAnswer: string, userAnswer: string) => Promise<AnswerFeedback>;
  playSound: (sound: 'thinking' | 'stopThinking' | 'correct' | 'incorrect') => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, activePlayer, onClose, onAnswer, checkAnswer, playSound }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [wager, setWager] = useState<number | string>('');
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [timer, setTimer] = useState(30);
  const [modalState, setModalState] = useState<ModalState>('question');
  
  // FIX: Use ReturnType<typeof setInterval> for the timer ref to be compatible with browser environments.
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (question.isDailyDouble) {
      setModalState('dailyDoubleWager');
    } else {
      setModalState('question');
      startTimer();
    }
    
    // Cleanup on unmount or question change
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('stopThinking');
    };
  }, [question]);

  const startTimer = () => {
    setTimer(30);
    playSound('thinking');
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleTimeUp = async () => {
     playSound('stopThinking');
     setFeedback({ isCorrect: false, explanation: "Time is up! The correct answer was:" });
     setModalState('feedback');
  }

  const handleWagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wagerAmount = Number(wager);
    const maxWager = Math.max(activePlayer.score, 1000); // Allow wagering up to 1000 if score is low
    if (wagerAmount >= 5 && wagerAmount <= maxWager) {
      setModalState('question');
      startTimer();
    } else {
      alert(`Invalid wager. Please enter a value between 5 and ${maxWager}.`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('stopThinking');
    if (!userAnswer.trim()) return;
    setModalState('checking');
    const result = await checkAnswer(question.question, question.answer, userAnswer);
    setFeedback(result);
    setModalState('feedback');
  };

  const handleContinue = () => {
    if (feedback) {
      onAnswer(feedback.isCorrect, question.isDailyDouble ? Number(wager) : question.points);
    }
  };

  const renderDailyDoubleWager = () => (
    <div className="min-h-[400px] flex flex-col justify-center items-center animate-fade-in">
        <h2 className="text-6xl font-bold text-yellow-300 animate-pulse mb-8">DAILY DOUBLE</h2>
        <p className="text-2xl mb-4">Wager an amount up to ${Math.max(activePlayer.score, 1000)}</p>
        <form onSubmit={handleWagerSubmit} className="flex flex-col items-center gap-4">
            <input 
                type="number"
                value={wager}
                onChange={(e) => setWager(e.target.value)}
                className="w-full max-w-xs p-3 rounded-lg bg-gray-800 border border-gray-600 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter wager..."
                autoFocus
                min="5"
                max={Math.max(activePlayer.score, 1000)}
            />
            <button
                type="submit"
                className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
            >
                Set Wager
            </button>
        </form>
    </div>
  );

  const renderQuestion = () => (
    <div className="min-h-[400px] flex flex-col justify-between">
         <div>
            <div className="flex justify-between items-start">
              <h2 className="text-4xl sm:text-5xl text-yellow-400 font-bold mb-4">${question.isDailyDouble ? wager : question.points}</h2>
              <div className="text-4xl font-bold text-red-500">{timer}</div>
            </div>
            {question.imageUrl && <img src={question.imageUrl} alt="Visual clue" className="my-4 mx-auto max-h-48 rounded-lg shadow-lg" />}
            <p className="text-2xl sm:text-3xl text-white mb-6">{question.question}</p>
         </div>
         <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
             <input 
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full max-w-md p-3 rounded-lg bg-gray-800 border border-gray-600 text-white text-xl text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Type your answer here..."
                autoFocus
             />
             <button
                type="submit"
                className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
             >
                Submit Answer
             </button>
         </form>
    </div>
  );
  
  const renderChecking = () => (
     <div className="flex flex-col items-center justify-center min-h-[400px]">
       <SpinnerIcon />
       <p className="mt-4 text-xl text-gray-300">Checking your answer...</p>
     </div>
  );
  
  const renderFeedback = () => (
    <div className="animate-fade-in min-h-[400px] flex flex-col justify-center">
        <p className="text-xl text-gray-300 mb-2">Your Answer: "{userAnswer}"</p>
        <p className={`text-5xl font-bold mb-4 ${feedback?.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {feedback?.isCorrect ? 'Correct!' : 'Incorrect'}
        </p>
        <p className="text-lg text-white mb-6">{feedback?.explanation}</p>
        {!feedback?.isCorrect && <p className="text-2xl text-yellow-300 mb-6">Correct Answer: {question.answer}</p>}
        <button
            onClick={handleContinue}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 self-center"
        >
            Continue
        </button>
    </div>
  );

  const renderContent = () => {
    switch (modalState) {
      case 'dailyDoubleWager': return renderDailyDoubleWager();
      case 'question': return renderQuestion();
      case 'checking': return renderChecking();
      case 'feedback': return renderFeedback();
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-blue-900 border-4 border-yellow-400 rounded-lg shadow-2xl w-full max-w-4xl text-center p-8 relative transform transition-all duration-300 scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-white text-4xl font-bold z-10"
          aria-label="Close"
        >
          &times;
        </button>
        {renderContent()}
      </div>
       <style>{`
          @keyframes scale-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
       `}</style>
    </div>
  );
};

export default QuestionModal;