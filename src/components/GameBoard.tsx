import { useEffect} from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { useSound } from '../hooks/useSound';
import { GameStats } from './GameStats';
import { ColorGrid } from './ColorGrid';
import { GameOver } from './GameOver';
import { LoadingScreen } from './LoadingScreen';
import { programmingLanguages } from '../data/languages';

const GameBoard = () => {
  const gameLogic = useGameLogic();
  const { playSuccessSound, playFailureSound } = useSound();


  const handleColorSelect = (selectedColor: string) => {
    if (gameLogic.currentLanguage?.color === selectedColor) {
      playSuccessSound();
    } else {
      playFailureSound();
    }
    gameLogic.handleColorSelect(selectedColor);
  };

  const flashLanguages = async () => {
    for (const language of programmingLanguages.slice(0, 10)) {
      gameLogic.setCurrentLanguage(language);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    gameLogic.setCurrentLanguage(null);
    startGame();
  };

  const startGame = () => {
    gameLogic.setGameStarted(true);
    const firstLanguage = gameLogic.shuffleAndGetLanguage();
    gameLogic.setCurrentLanguage(firstLanguage);
  };

  useEffect(() => {
    if (!gameLogic.gameStarted) {
      flashLanguages();
    }
  }, [gameLogic.gameStarted]);

  if (!gameLogic.gameStarted) {
    return <LoadingScreen currentLanguage={gameLogic.currentLanguage} />;
  }


  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-xl">
          <GameStats 
            attempts={gameLogic.attempts}
            successfulAttempts={gameLogic.successfulAttempts}
            failedAttempts={gameLogic.failedAttempts}
            gameOver={gameLogic.gameOver}
            results={gameLogic.results}
          />

          {gameLogic.gameOver ? (
            <GameOver 
              successfulAttempts={gameLogic.successfulAttempts}
              attempts={gameLogic.attempts}
              consecutiveFailures={gameLogic.consecutiveFailures}
              results={gameLogic.results}
            />
          ) : (
            gameLogic.currentLanguage && (
              <ColorGrid 
                currentLanguage={gameLogic.currentLanguage}
                onColorSelect={handleColorSelect}
              />
            )
          )}
          <div className='pt-10 text-center font-bold'>
            <h1 className='text-xl '>Developed By <span className='text-green-600 underline shadow-md text-stroke'>Ricky Boy</span>. Happy Playing 🌟</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
