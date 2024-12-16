import React from 'react';
import { ProgrammingLanguage } from '../types/game';

interface LoadingScreenProps {
  currentLanguage: ProgrammingLanguage | null;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ currentLanguage }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Loading Game...</h1>
        {currentLanguage && (
          <div 
            className="w-32 h-32 mx-auto rounded-lg transition-all duration-100"
            style={{ backgroundColor: currentLanguage.color }}
          >
            <img 
              src={currentLanguage.logo} 
              alt={currentLanguage.name}
              className="w-full h-full p-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};