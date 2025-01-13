'use client';

import { useState, useEffect, useRef } from 'react';
import Statistics from './Statistics';

const wordList = [
  'ev', 'su', 'ben', 'sen', 'gel', 'git', 'al', 'ver', 'gün', 'ay',
  'yıl', 'iyi', 'kötü', 'güzel', 'çok', 'az', 'var', 'yok', 'evet', 'hayır',
  'anne', 'baba', 'kardeş', 'abla', 'abi', 'dede', 'nine', 'amca', 'teyze', 'hala',
  'okul', 'kitap', 'kalem', 'masa', 'sandalye', 'kapı', 'pencere', 'oda', 'ev', 'bahçe',
  'ekmek', 'su', 'çay', 'süt', 'yemek', 'meyve', 'sebze', 'et', 'balık', 'tavuk',
  'sabah', 'öğle', 'akşam', 'gece', 'bugün', 'yarın', 'dün', 'şimdi', 'sonra', 'önce',
  'sıcak', 'soğuk', 'büyük', 'küçük', 'uzun', 'kısa', 'ağır', 'hafif', 'hızlı', 'yavaş',
  'kırmızı', 'mavi', 'yeşil', 'sarı', 'siyah', 'beyaz', 'mor', 'pembe', 'turuncu', 'gri',
  'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on',
  'uyku', 'oyun', 'spor', 'müzik', 'film', 'dans', 'resim', 'yazı', 'şarkı', 'hikaye'
];

const generateText = () => {
  const shuffled = [...wordList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 200).join(' ');
};

interface TestStats {
  wpm: number;
  accuracy: number;
}

const TypingTest = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [stats, setStats] = useState<TestStats & { correctChars: number; incorrectChars: number }>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0
  });
  const [correctWords, setCorrectWords] = useState<number[]>([]);
  const [wrongWords, setWrongWords] = useState<number[]>([]);
  const [currentWordCorrect, setCurrentWordCorrect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(generateText());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const endTest = () => {
    setIsActive(false);
    setTestComplete(true);
    
    const correctCount = correctWords.length;
    const timeSpent = (60 - timeLeft) / 60;
    const wpm = Math.round(correctCount / timeSpent);
    
    // Karakter sayılarını hesapla
    let correctChars = 0;
    let incorrectChars = 0;
    
    const words = text.split(' ');
    correctWords.forEach(index => {
      correctChars += words[index].length;
    });
    wrongWords.forEach(index => {
      incorrectChars += words[index].length;
    });
    
    const totalAttempted = correctWords.length + wrongWords.length;
    const accuracy = totalAttempted > 0 
      ? Math.round((correctCount / totalAttempted) * 100) 
      : 0;
      
    setStats({ 
      wpm, 
      accuracy,
      correctChars,
      incorrectChars
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && e.target.value.length === 1) {
      setIsActive(true);
    }

    const newInput = e.target.value;
    const words = text.split(' ');
    const targetWord = words[currentIndex];

    if (newInput.endsWith(' ')) {
      const typedWord = newInput.trim();
      let isCorrect = true;
      
      if (typedWord.length === targetWord.length) {
        for (let i = 0; i < targetWord.length; i++) {
          if (typedWord[i] !== targetWord[i]) {
            isCorrect = false;
            break;
          }
        }
      } else {
        isCorrect = false;
      }

      if (isCorrect) {
        setCorrectWords([...correctWords, currentIndex]);
      } else {
        setWrongWords([...wrongWords, currentIndex]);
      }

      setInput('');
      setCurrentIndex(currentIndex + 1);
      setCurrentWordCorrect(true);
    } else {
      let isCurrentCorrect = true;
      const currentTyping = newInput.trim();
      
      for (let i = 0; i < currentTyping.length; i++) {
        if (i >= targetWord.length || currentTyping[i] !== targetWord[i]) {
          isCurrentCorrect = false;
          break;
        }
      }
      
      setInput(newInput);
      setCurrentWordCorrect(isCurrentCorrect);
    }

    if (currentIndex === words.length) {
      endTest();
    }
  };

  const renderText = () => {
    const words = text.split(' ');
    const currentWordIndex = currentIndex;
    const currentTyping = input.trim();
    const wordsPerLine = 10;
    const currentLineIndex = Math.floor(currentWordIndex / wordsPerLine);
    const visibleLines = [currentLineIndex, currentLineIndex + 1];
    
    return (
      <div className="font-mono text-lg leading-relaxed">
        {visibleLines.map(lineIndex => {
          const lineStart = lineIndex * wordsPerLine;
          const lineWords = words.slice(lineStart, lineStart + wordsPerLine);
          
          return (
            <div key={lineIndex} className="flex flex-wrap gap-2 mb-2">
              {lineWords.map((word, index) => {
                const globalIndex = lineStart + index;
                
                if (globalIndex < currentWordIndex) {
                  const isCorrect = correctWords.includes(globalIndex);
                  return (
                    <span
                      key={index}
                      className={`${
                        isCorrect ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {word}
                    </span>
                  );
                }
                
                if (globalIndex === currentWordIndex) {
                  let displayWord = '';
                  for (let i = 0; i < word.length; i++) {
                    if (i < currentTyping.length) {
                      if (currentTyping[i] === word[i]) {
                        displayWord += `<span class="text-green-500">${word[i]}</span>`;
                      } else {
                        displayWord += `<span class="text-red-500">${word[i]}</span>`;
                      }
                    } else {
                      displayWord += `<span class="text-gray-300">${word[i]}</span>`;
                    }
                  }
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-[#0F172A] px-1 rounded"
                      dangerouslySetInnerHTML={{ __html: displayWord }}
                    />
                  );
                }
                
                return (
                  <span key={index} className="text-gray-500">
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-8">
        {!testComplete ? (
          <>
            {/* Timer */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className={`text-7xl font-bold ${
                  timeLeft <= 10 ? 'animate-pulse text-red-500' : 'text-white'
                }`}>
                  {timeLeft}
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm font-medium tracking-wider">
                  saniye
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 shadow-xl">
              <div className="prose prose-lg prose-invert max-w-none">
                {renderText()}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full mt-6 bg-gray-800/50 text-white p-4 rounded-xl border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 font-mono text-lg"
                placeholder="Yazmaya başlayın..."
              />
            </div>

            {/* Instructions */}
            <div className="text-center text-gray-400 text-sm space-y-2 animate-fade-in">
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <Statistics
              wpm={stats.wpm}
              accuracy={stats.accuracy}
              correctChars={stats.correctChars}
              incorrectChars={stats.incorrectChars}
              totalTime={60 - timeLeft}
            />
            <button
              onClick={() => window.location.reload()}
              className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Yeniden Başla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
