import React from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { GameResult } from '../types/game';

interface GameStatsProps {
  attempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  gameOver: boolean;
  results: GameResult[];
}

export const GameStats: React.FC<GameStatsProps> = ({
  attempts,
  successfulAttempts,
  failedAttempts,
  gameOver,
  results
}) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="space-y-2">
        <p className="text-lg">Attempts: {attempts}/20</p>
        <p className="text-lg">Successful: {successfulAttempts}</p>
        <p className="text-lg">Failed: {failedAttempts}</p>
      </div>
      {gameOver && (
        <button
          onClick={() => generatePDF(results)}
          className="flex items-center bg-blue-600 text-white h-10 px-2  rounded hover:bg-blue-700"
        >
          <Download size={20} />
          Download Results
        </button>
      )}
    </div>
  );
};