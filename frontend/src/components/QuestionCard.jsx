import { useState } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function QuestionCard({ question, index, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    onAnswer(option === question.answer);
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors">
      <div className="flex items-start gap-4 mb-8">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-100 dark:border-indigo-500/20 shadow-inner">
          {index + 1}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 pt-1 leading-tight">
          {question.question}
        </h3>
      </div>

      <div className="space-y-4 pl-0 sm:pl-16">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === question.answer;
          const isAnswered = selectedOption !== null;
          
          let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ";
          let letterClass = "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 transition-colors ";
          let textClass = "font-medium text-lg transition-colors ";
          
          if (!isAnswered) {
            buttonClass += "border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 bg-white dark:bg-slate-900/50 text-gray-700 dark:text-gray-200 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(79,70,229,0.15)] hover:-translate-y-0.5";
            letterClass += "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400";
          } else {
            if (isCorrect) {
              buttonClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 z-10 relative shadow-[0_0_20px_rgba(16,185,129,0.15)]";
              letterClass += "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300";
              textClass += "text-emerald-900 dark:text-emerald-100";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 z-10 relative shadow-[0_0_20px_rgba(244,63,94,0.15)]";
              letterClass += "bg-rose-200 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300";
              textClass += "text-rose-900 dark:text-rose-100";
            } else {
              buttonClass += "border-gray-100 dark:border-slate-800/50 bg-gray-50 dark:bg-slate-900/30 opacity-50";
              letterClass += "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-600";
              textClass += "text-gray-400 dark:text-gray-500";
            }
          }

          const letter = String.fromCharCode(65 + i);

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center">
                <span className={letterClass}>{letter}</span>
                <span className={textClass}>{option}</span>
              </div>
              {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
            </button>
          );
        })}
      </div>

      {selectedOption && question.explanation && (
        <div className="mt-8 pl-0 sm:pl-16">
          <div className="bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-500/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex items-center gap-3 mb-3 text-indigo-900 dark:text-indigo-300 font-bold text-lg">
              <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Explanation
            </div>
            <p className="text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed pl-9 text-lg">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
