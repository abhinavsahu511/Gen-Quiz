export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 dark:border-indigo-400/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 dark:border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
    </div>
  );
}
