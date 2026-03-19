import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      navigate(`/quiz?topic=${encodeURIComponent(topic.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl w-full text-center space-y-10 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-500/20">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 tracking-wide uppercase">AI-Powered Learning</span>
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Master Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Topic</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-md mx-auto leading-relaxed">
            Enter a subject and our AI will generate a custom quiz to test your knowledge instantly.
          </p>
        </div>
        
        <form onSubmit={handleStart} className="space-y-6 max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full pl-12 pr-4 py-5 border-2 border-gray-200 dark:border-gray-800 rounded-2xl leading-5 bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-500 text-lg transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-700"
              placeholder="e.g., Quantum Physics, React.js..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-5 px-6 border border-transparent rounded-2xl text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1"
          >
            Generate Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
