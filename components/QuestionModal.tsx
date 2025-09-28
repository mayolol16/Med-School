import React, { useState, useEffect, useRef } from 'react';
import { Question, AnswerFeedback, Player } from '../types';
import { SpinnerIcon } from './Icons';

type ModalState = 'dailyDoubleWager' | 'question' | 'checking' | 'aiFeedback' | 'manualFeedback';

interface QuestionModalProps {
  question: Question;
  activePlayer: Player;
  onClose: () => void;
  onAnswer: (correct: boolean, wager: number) => void;
  checkAnswer: (question: string, correctAnswer: string, userAnswer: string) => Promise<AnswerFeedback>;
  playSound: (sound: 'thinking' | 'stopThinking' | 'correct' | 'incorrect') => void;
  useAI: boolean;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, activePlayer, onClose, onAnswer, checkAnswer, playSound, useAI }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [wager, setWager] = useState<number | string>('');
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [timer, setTimer] = useState(30);
  const [modalState, setModalState] = useState<ModalState>('question');
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTimer = () => {
    setTimer(30);
    playSound('thinking');
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (question.isDailyDouble) {
      setModalState('dailyDoubleWager');
    } else {
      setModalState('question');
      startTimer();
    }
    
    // Auto-focus input
    setTimeout(() => inputRef.current?.focus(), 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('stopThinking');
    };
  }, [question]);

  const handleSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('stopThinking');

    if (useAI) {
      setModalState('checking');
      const result = await checkAnswer(question.question, question.answer, userAnswer || 'No answer');
      setFeedback(result);
      setModalState('aiFeedback');
    } else {
      setModalState('manualFeedback');
    }
  };

  const handleWagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wagerNum = Number(wager);
    const maxWager = Math.max(1000, activePlayer.score); // Can wager up to score or max question value in round

    if (wagerNum > 0 && wagerNum <= maxWager) {
        setModalState('question');
        startTimer();
    } else {
        alert(`Please enter a valid wager between $1 and $${maxWager}.`);
    }
  };
  
  const handleFinalAnswer = (isCorrect: boolean) => {
      const effectiveWager = question.isDailyDouble ? Number(wager) : question.points;
      onAnswer(isCorrect, effectiveWager);
  }

  const renderDailyDoubleWager = () => (
    <form onSubmit={handleWagerSubmit} className="flex flex-col items-center p-8 justify-center h-full">
      <h2 className="text-4xl font-bold text-red-500 mb-4 animate-pulse">DAILY DOUBLE!</h2>
      <p className="text-xl mb-4">Player: {activePlayer.name}</p>
      <p className="text-lg mb-6">Enter your wager (up to ${Math.max(1000, activePlayer.score)}):</p>
      <input
        ref={inputRef}
        type="number"
        value={wager}
        onChange={(e) => setWager(e.target.value)}
        className="w-full max-w-xs p-3 text-2xl text-center rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        min="1"
        max={Math.max(1000, activePlayer.score)}
        autoFocus
      />
      <button type="submit" className="mt-6 px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
        Lock In Wager
      </button>
    </form>
  );

  const renderQuestion = () => (
    <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <h2 className="text-lg sm:text-xl font-bold text-yellow-300">Player: {activePlayer.name}</h2>
        <div className="text-4xl font-bold text-red-500">{timer}</div>
      </div>
      <div className="my-auto text-center">
        {question.imageUrl && <img src={question.imageUrl} alt="Question clue" className="max-h-48 mx-auto mb-4 rounded-lg" />}
        <p className="text-2xl sm:text-4xl text-white font-semibold mb-6">{question.question}</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-full p-3 text-xl text-center rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Type your answer here..."
          autoFocus
        />
        <button type="submit" className="w-full mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">
          Submit Answer
        </button>
      </form>
    </div>
  );

  const renderChecking = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <SpinnerIcon />
      <p className="mt-4 text-2xl text-gray-300">Checking answer...</p>
    </div>
  );

  const renderAIFeedback = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className={`text-5xl font-bold mb-4 ${feedback?.isCorrect ? 'text-green-400' : 'text-red-500'}`}>
        {feedback?.isCorrect ? 'Correct!' : 'Incorrect'}
      </h2>
      <p className="text-xl text-gray-300 mb-6">{feedback?.explanation}</p>
      <button onClick={() => handleFinalAnswer(feedback!.isCorrect)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
        Continue
      </button>
    </div>
  );

  const renderManualFeedback = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-3xl font-bold mb-4 text-yellow-300">Judge Your Answer</h2>
      <div className="bg-black p-4 rounded-lg w-full mb-6">
          <p className="text-gray-400 text-lg">Your Answer:</p>
          <p className="text-white text-2xl font-semibold">{userAnswer || 'No answer'}</p>
      </div>
       <div className="bg-black p-4 rounded-lg w-full mb-8">
          <p className="text-gray-400 text-lg">Correct Answer:</p>
          <p className="text-green-400 text-2xl font-bold">{question.answer}</p>
      </div>
      <p className="text-xl mb-6">Were you correct?</p>
      <div className="flex gap-4">
        <button onClick={() => handleFinalAnswer(true)} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
          Correct
        </button>
        <button onClick={() => handleFinalAnswer(false)} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          Incorrect
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(modalState) {
      case 'dailyDoubleWager': return renderDailyDoubleWager();
      case 'question': return renderQuestion();
      case 'checking': return renderChecking();
      case 'aiFeedback': return renderAIFeedback();
      case 'manualFeedback': return renderManualFeedback();
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-blue-900 border-4 border-yellow-400 rounded-lg shadow-2xl w-full max-w-3xl h-3/4 max-h-[600px] relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-4xl text-gray-400 hover:text-white">&times;</button>
        {renderContent()}
      </div>
    </div>
  );
};

export default QuestionModal;