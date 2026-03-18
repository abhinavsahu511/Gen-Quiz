export default function ScoreBoard({ score, total }) {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200 dark:border-slate-700/50 rounded-2xl px-5 py-2.5 flex items-center space-x-3 shadow-sm">
      <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Score</span>
      <div className="flex items-baseline space-x-1">
        <span className="text-gray-900 dark:text-white font-extrabold text-xl">{score}</span>
        <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">/ {total}</span>
      </div>
    </div>
  );
}
