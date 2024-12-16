import React from 'react';
import { GameResult } from '../types/game';

interface TableProps {
  results?: GameResult[];
}

export const Table: React.FC<TableProps> = ({results}) => {
  const resultsToDisplay = results || [];  
  const correctAnswers = resultsToDisplay.filter(r => r.isCorrect).length;
  const successRate = ((correctAnswers / resultsToDisplay.length) * 100).toFixed(2) || "0.00"; 

    return (
        <div className="p-4"> {/* Added padding */}
            <h1 className="text-2xl font-bold mb-4">Programming Language Color Match Results</h1>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">#</th>
                        <th className="border border-gray-400 px-4 py-2">Language</th>
                        <th className="border border-gray-400 px-4 py-2">Selected Color</th>
                        <th className="border border-gray-400 px-4 py-2">Correct Color</th> 
                        <th className="border border-gray-400 px-4 py-2">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsToDisplay.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}> {/* Alternating row colors */}
                            <td className="border border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-400 px-4 py-2">{result.language}</td>
                            <td className="border border-gray-400 px-4 py-2" style={{ backgroundColor: result.selectedColor }}></td>
                            <td className="border border-gray-400 px-4 py-2" style={{ backgroundColor: result.correctColor }}></td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{result.isCorrect ? 'Correct ✅' : 'Incorrect ⛔'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4"> {/* Added margin top */}
                <p className="text-lg">Total Attempts: {resultsToDisplay.length}</p>
                <p className="text-lg">Correct Answers: {correctAnswers}</p>
                <p className="text-lg">Success Rate: {successRate}%</p>
            </div>
        </div>
    );
};

