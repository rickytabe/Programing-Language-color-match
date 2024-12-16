import { useState, useCallback } from 'react';
import { programmingLanguages } from '../data/languages';
import { GameState } from '../types/game';

export const useGameLogic = () => {
  const [currentLanguage, setCurrentLanguage] = useState<GameState['currentLanguage']>(null);
  const [attempts, setAttempts] = useState(0);
  const [successfulAttempts, setSuccessfulAttempts] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [usedLanguages, setUsedLanguages] = useState(new Set<string>());
  const [results, setResults] = useState<GameState['results']>([]);

  const shuffleAndGetLanguage = useCallback(() => {
    const availableLanguages = programmingLanguages.filter(lang => !usedLanguages.has(lang.name));
    if (availableLanguages.length === 0) {
      setGameOver(true);
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableLanguages.length);
    return availableLanguages[randomIndex];
  }, [usedLanguages]);

  const handleColorSelect = (selectedColor: string) => {
    if (gameOver || !currentLanguage) return;

    const isCorrect = selectedColor === currentLanguage.color;
    const newResult = {
      language: currentLanguage.name,
      selectedColor,
      correctColor: currentLanguage.color,
      isCorrect
    };

    setResults(prev => [...prev, newResult]);
    
    if (isCorrect) {
      setSuccessfulAttempts(prev => prev + 1);
      setConsecutiveFailures(0);
    } else {
      setFailedAttempts(prev => prev + 1);
      setConsecutiveFailures(prev => prev + 1);
    }

    setAttempts(prev => prev + 1);
    setUsedLanguages(prev => new Set([...prev, currentLanguage.name]));

    if (consecutiveFailures + 1 >= 5 || attempts + 1 >= 20) {
      setGameOver(true);
    } else {
      const nextLanguage = shuffleAndGetLanguage();
      setCurrentLanguage(nextLanguage);
    }
  };

  return {
    currentLanguage,
    setCurrentLanguage,
    attempts,
    successfulAttempts,
    failedAttempts,
    consecutiveFailures,
    gameOver,
    setGameOver,
    gameStarted,
    setGameStarted,
    results,
    handleColorSelect,
    shuffleAndGetLanguage
  };
};