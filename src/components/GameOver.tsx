import { Table } from './Table';
import React from 'react';
import { GameResult } from '../types/game';


interface GameOverProps {
  successfulAttempts: number;
  attempts: number;
  consecutiveFailures: number;
  results: GameResult[];
}

export const GameOver: React.FC<GameOverProps> = ({ 
  successfulAttempts, 
  attempts, 
  consecutiveFailures,
  results,
}) => {

  const handleRestart = () => {
   window.location.reload();
  };

  return (
    <>
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl mb-2">Final Score: {successfulAttempts} / {attempts}</p>
      {consecutiveFailures >= 5 && (
        <p className="text-red-600">Game ended due to 5 consecutive failures!</p>
      )}
    </div>
    <Table results={results} />
    <div className="text-center mt-4">
        <button
          onClick={handleRestart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Restart Game
        </button>
      </div>
    </>
  );
};