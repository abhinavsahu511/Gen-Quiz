import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white font-sans transition-colors duration-200">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}
