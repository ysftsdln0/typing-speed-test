'use client';

import { useState, useEffect, useRef } from 'react';
import Statistics from './Statistics';
import { useTheme } from '@/context/ThemeContext';

const wordList = [
  'almak', 'yani', 'bakmak', 'sadece', 'gibi', 'sormak', 'bakmak', 'gün', 'sağlamak', 'anlatmak',
  'süre', 'göre', 'olay', 'el', 'birbiri', 'sadece', 'şey', 'daha', 'koymak', 'yan',
  'yapmak', 'insan', 'sağlamak', 'yapmak', 'yazmak', 'baba', 'durum', 'sonuç', 'büyük', 'yıl',
  'biraz', 'kendi', 'dünya', 'kapı', 'ama', 'öyle', 'adam', 'yol', 'ara', 'onlar',
  'gibi', 'bulunmak', 'su', 'hiç', 'dünya', 'önemli', 'kalmak', 'göz', 'atmak', 'gelmek',
  'yaşamak', 'kitap', 'birbiri', 'kadar', 'bugün', 'devlet', 'sen', 'durmak', 'ürün', 'alt',
  'uzun', 'biri', 'bile', 'bilgi', 'bunlar', 'doğru', 'anlatmak', 'hayat', 'zaman', 'bile',
  'durmak', 'ad', 'değil', 'anne', 'az', 'neden', 'duymak', 'sahip', 'ad', 'yüz',
  'fazla', 'kullanılmak', 'birlikte', 'iyi', 'hem', 'iş', 'beklemek', 'şey', 'neden', 'son',
  'girmek', 'ile', 'ya', 'o', 'ad', 'diye', 'süre', 'an', 'saat', 'yemek',
  'demek', 'yaş', 'bırakmak', 'iyi', 'büyük', 'işte', 'biraz', 'yapmak', 'tutmak', 'göre',
  'bulmak', 'geçmek', 'vermek', 'göre', 'koymak', 'bütün', 'iki', 'çünkü', 'ses', 'bazı',
  've', 'ilk', 'kullanmak', 'ev', 'adam', 'karşı', 'çocuk', 'olmak', 'bunu', 'istemek',
  'sorun', 'el', 'başlamak', 'bulunmak', 'siz', 'gitmek', 'sıra', 'var', 'arkadaş', 'hep',
  'iş', 'beklemek', 'görmek', 'bulmak', 'dönem', 'gün', 'yok', 'hiçbir', 'yol', 'hem',
  'dış', 'bugün', 'kadın', 'konuşmak', 'bunun', 'el', 'konu', 'etmek', 'verilmek', 'bunlar',
  'şu', 'bir', 'ilk', 'karşı', 'görmek', 'bir', 'çocuk', 'bilgi', 'ya', 'söz',
  'büyük', 'tek', 'dönmek', 'göz', 'alınmak', 'şu', 'çekmek', 'tek', 'ile', 'iki',
  'zaman', 'orta', 'kişi', 'onun', 'ara', 'girmek', 'diğer', 'çıkarmak', 'olay', 'demek',
  'öyle', 'düşmek', 'zaman', 'veya', 'ben', 'aynı', 'nasıl', 'kullanmak', 'çıkarmak', 'bunu',
  'yani', 'sevmek', 'gerekmek', 'onun', 'arkadaş', 'ki', 'koymak', 'yan', 'yine', 'birlikte',
  'ise', 'üzerine', 'olay', 'sistem', 'çıkmak', 'uzun', 'değil', 'anne', 'alan', 'su',
  'gelmek', 'tutmak', 'kişi', 'bırakmak', 'söz', 'içinde', 'dönmek', 'şimdi', 'baba', 'taraf',
  'yaşamak', 'içinde', 'diye', 'adam', 'yol', 'yaş', 'kullanmak', 'anne', 'hiçbir', 'yine',
  'bilmek', 'biz', 'çünkü', 'bazı', 'demek', 'yeni', 'yapılmak', 'biz', 'kız', 'yine',
  'en', 'hep', 'geçmek', 'durmak', 'yer', 'verilmek', 'az', 'başlamak', 'göstermek', 'kullanılmak',
  'bunun', 'kim', 'çok', 'ile', 'iç', 'birbiri', 'gece', 'açmak', 'ev', 'sonra',
  'durum', 'konu', 'içinde', 'sorun', 'bunu', 'hemen', 'yıl', 'ancak', 'bakmak', 'bu',
  'başlamak', 'hiçbir', 'diğer', 'önce', 'diğer', 'dış', 'vermek', 'nasıl', 'bulmak', 'hiç',
  'var', 'çıkarmak', 'açmak', 'çok', 'her', 'oturmak', 'kız', 'en', 'ilk', 'şimdi',
  'bırakmak', 'yer', 'ay', 'az', 'almak', 'zor', 'çok', 'işte', 'burada', 'bütün',
  'söylemek', 'göz', 'açmak', 'yapılmak', 'hayat', 'o', 'baş', 'olmak', 'üzerinde', 'siz',
  'çünkü', 'ama', 'ya', 'durum', 'tüm', 'insan', 'kendi', 'verilmek', 'uzun', 'karşı',
  'biraz', 'ama', 'böyle', 'duymak', 'başka', 'yüz', 'bile', 'vermek', 'zor', 'sorun',
  'sormak', 'yıl', 'konuşmak', 'dış', 'aynı', 'çünkü', 'dünya', 'orta', 'duymak', 'saat',
  'dünya', 'hep'
];

const generateText = () => {
  const shuffled = [...wordList].sort(() => Math.random() - 0.5);
  return shuffled.join(' ');
};

interface TestStats {
  wpm: number;
  accuracy: number;
}

const TypingTest = () => {
  const { theme } = useTheme();
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
    const wordsPerLine = 7;
    const currentLineIndex = Math.floor(currentWordIndex / wordsPerLine);
    const visibleLines = [currentLineIndex, currentLineIndex + 1];
    
    return (
      <div className="font-mono text-2xl leading-loose">
        {visibleLines.map(lineIndex => {
          const lineStart = lineIndex * wordsPerLine;
          const lineWords = words.slice(lineStart, lineStart + wordsPerLine);
          
          return (
            <div key={lineIndex} className="flex flex-wrap gap-3 mb-6 justify-center items-center min-h-[60px]">
              {lineWords.map((word, index) => {
                const globalIndex = lineStart + index;
                
                if (globalIndex < currentWordIndex) {
                  const isCorrect = correctWords.includes(globalIndex);
                  return (
                    <span
                      key={index}
                      className={`${
                        isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      } px-2 py-1`}
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
                        displayWord += `<span class="${theme === 'dark' ? 'text-green-400' : 'text-green-600'}">${word[i]}</span>`;
                      } else {
                        displayWord += `<span class="${theme === 'dark' ? 'text-red-400' : 'text-red-600'}">${word[i]}</span>`;
                      }
                    } else {
                      displayWord += `<span class="${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}">${word[i]}</span>`;
                    }
                  }
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded"
                      dangerouslySetInnerHTML={{ __html: displayWord }}
                    />
                  );
                }
                
                return (
                  <span key={index} className="text-gray-900 dark:text-gray-300 px-2 py-1">
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
    <div className="p-12 space-y-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-3xl transition-colors duration-200">
      <div className="space-y-12">
        {!testComplete ? (
          <>
            {/* Timer */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className={`text-7xl font-bold ${
                  timeLeft <= 10 ? 'animate-pulse text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {timeLeft}
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wider">
                  saniye
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div className="bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-12 rounded-3xl border border-gray-200 dark:border-gray-700/50 shadow-xl max-w-7xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderText()}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full mt-8 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 font-mono text-2xl"
                placeholder="Yazmaya başlayın..."
              />
            </div>

            {/* Instructions */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm space-y-2 animate-fade-in">
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
