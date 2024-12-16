import React from 'react';
import { programmingLanguages } from '../data/languages';
import { ProgrammingLanguage } from '../types/game';

//This is the approach i used for the color selector
interface ColorGridProps {
  currentLanguage: ProgrammingLanguage;
  onColorSelect: (color: string) => void;
}

export const ColorGrid: React.FC<ColorGridProps> = ({ currentLanguage, onColorSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">
        Select the color for <span className='text-green-600 underline shadow-md text-stroke'> {currentLanguage.name}</span>
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {programmingLanguages.slice(0, 8).map(lang => (
          <button
            key={lang.color}
            onClick={() => onColorSelect(lang.color)}
            className="w-full h-32 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: lang.color }}
          />
        ))}
      </div>
    </div>
  );
};