import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ScoreBoard from '../components/ScoreBoard';
import Loader from '../components/Loader';
import { ArrowLeft } from 'lucide-react';
import { generateQuestions } from '../services/geminiService';

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [fetchingMore, setFetchingMore] = useState(false);

  const fetchQuestions = async (isMore = false) => {
    if (!topic) return;
    
    if (isMore) setFetchingMore(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await generateQuestions(topic, 10);
      
      if (isMore) {
        setQuestions(prev => [...prev, ...data]);
      } else {
        setQuestions(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    if (!topic) {
      navigate('/');
      return;
    }
    fetchQuestions();
  }, [topic, navigate]);

  const handleAnswer = (isCorrect) => {
    setAnsweredCount(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-12 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-lg w-full mx-4 text-center">
          <div className="mb-8 transform scale-125">
            <Loader />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Crafting Your Quiz
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generating questions about
          </p>
          <div className="mt-4 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl animate-pulse">
              "{topic}"
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-md w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-8">{error}</p>
          <button 
            onClick={() => fetchQuestions()}
            className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transform hover:-translate-y-1"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-3xl mx-auto p-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8 sticky top-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl py-4 px-6 rounded-2xl z-20 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 truncate max-w-[200px] sm:max-w-xs">
            {topic}
          </h2>
          <ScoreBoard score={score} total={questions.length} />
        </div>

        <div className="space-y-8">
          {questions.map((q, index) => (
            <QuestionCard 
              key={index} 
              question={q} 
              index={index} 
              onAnswer={handleAnswer} 
            />
          ))}
        </div>

        <div className="mt-12 text-center pb-12">
          <button
            onClick={() => fetchQuestions(true)}
            disabled={fetchingMore}
            className="px-8 py-4 border border-transparent rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {fetchingMore ? 'Generating...' : 'Load More Questions'}
          </button>
        </div>
      </div>
    </div>
  );
}
