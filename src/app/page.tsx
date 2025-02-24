'use client';

import TypingTest from '@/components/TypingTest';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent animate-gradient">
            Türkçe Yazma Hızı Testi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in">
            Yazma hızınızı test edin ve kendinizi geliştirin
          </p>
        </div>
        <div className="backdrop-blur-sm bg-white/80 dark:bg-white/5 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 animate-slide-up">
          <TypingTest />
        </div>
      </div>
    </main>
  );
}
