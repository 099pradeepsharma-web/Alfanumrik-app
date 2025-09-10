
import React, { useState, useEffect, useCallback } from 'react';
import type { Course, Question } from '../types';
import { generateAdaptiveQuestion } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface LearningModuleProps {
  course: Course;
  onBack: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ course, onBack }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [score, setScore] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState(0);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setIsAnswered(false);
    try {
      const q = await generateAdaptiveQuestion(course.subject, course.title, difficulty);
      if (q) {
        setQuestion(q);
      } else {
        setError('Failed to load a new question. Please try again.');
      }
    } catch (e) {
      setError('An error occurred while fetching the question.');
    } finally {
      setLoading(false);
    }
  }, [course.subject, course.title, difficulty]);

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    setQuestionsAttempted(prev => prev + 1);

    if (selectedAnswer === question?.correctOptionIndex) {
      setScore(prev => prev + 1);
      setDifficulty(d => d === 'easy' ? 'medium' : 'hard');
    } else {
      setDifficulty(d => d === 'hard' ? 'medium' : 'easy');
    }
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index
        ? 'bg-indigo-200 border-indigo-500'
        : 'bg-white hover:bg-slate-50 border-slate-300';
    }
    if (index === question?.correctOptionIndex) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    if (index === selectedAnswer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-slate-100 border-slate-300 text-slate-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-semibold mb-6">
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-800">{course.title}</h1>
            <div className="text-lg font-bold text-indigo-600">Score: {score}/{questionsAttempted}</div>
        </div>

        {loading && <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}
        {error && <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>}
        
        {question && !loading && (
          <div>
            <p className="text-lg text-slate-700 mb-6">{question.questionText}</p>
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isAnswered && setSelectedAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${getButtonClass(index)}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="mt-6 text-right">
              {isAnswered ? (
                <button onClick={fetchQuestion} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                  Next Question
                </button>
              ) : (
                <button onClick={handleAnswerSubmit} disabled={selectedAnswer === null} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                  Submit
                </button>
              )}
            </div>

            {isAnswered && selectedAnswer !== question.correctOptionIndex && (
              <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                <h4 className="font-bold text-amber-800">Explanation</h4>
                <p className="text-amber-700 mt-2">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule;
