'use client';

  interface TestStats {
    wpm: number;
    accuracy: number;
    timestamp: Date;
  }

  interface StatisticsProps {
    wpm: number;
    accuracy: number;
    correctChars: number;
    incorrectChars: number;
    totalTime: number;
  }

  const Statistics = ({ wpm, accuracy, correctChars, incorrectChars, totalTime }: StatisticsProps) => {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/80 p-8 rounded-2xl shadow-2xl mt-8 transform hover:scale-[1.02] transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
          Test Sonuçları
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:translate-y-[-4px] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-500/30">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">WPM</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
              {Math.round(wpm)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:translate-y-[-4px] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Doğruluk</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 bg-clip-text text-transparent">
              {Math.round(accuracy)}%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:translate-y-[-4px] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500/30">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Doğru Karakterler</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
              {correctChars}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:translate-y-[-4px] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-500/30">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Yanlış Karakterler</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-500 bg-clip-text text-transparent">
              {incorrectChars}
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default Statistics;