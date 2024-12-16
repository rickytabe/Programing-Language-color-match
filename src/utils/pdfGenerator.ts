import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { GameResult } from '../types/game';

export const generatePDF = async (results: GameResult[]) => {
  const doc = new jsPDF();

  // Create a temporary div to hold the styled table
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">  </div>
  `;


  const resultsToDisplay = results || [];
  const correctAnswers = resultsToDisplay.filter(r => r.isCorrect).length;
  const successRate = ((correctAnswers / resultsToDisplay.length) * 100).toFixed(2) || "0.00";

    // Set the content of the temporary div to match the Table component's structure and styles
    tempDiv.innerHTML = `
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Programming Language Color Match Results</h1>
        <table class="w-full border-collapse border border-gray-400">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-400 px-4 py-2">#</th>
                    <th class="border border-gray-400 px-4 py-2">Language</th>
                    <th class="border border-gray-400 px-4 py-2">Selected Color</th>
                    <th class="border border-gray-400 px-4 py-2">Correct Color</th>
                    <th class="border border-gray-400 px-4 py-2">Result</th>
                </tr>
            </thead>
            <tbody>
              ${resultsToDisplay.map((result, index) => `
                <tr class="${index % 2 === 0 ? 'bg-gray-100' : ''}">
                    <td class="border border-gray-400 px-4 py-2 text-center">${index + 1}</td>
                    <td class="border border-gray-400 px-4 py-2">${result.language}</td>
                    <td class="border border-gray-400 px-4 py-2" style="background-color: ${result.selectedColor}"></td>
                    <td class="border border-gray-400 px-4 py-2" style="background-color: ${result.correctColor}"></td>
                    <td class="border border-gray-400 px-4 py-2 text-center">${result.isCorrect ? 'Correct ✅' : 'Incorrect ⛔'}</td>
                </tr>
              `).join('')}
            </tbody>
        </table>
        <div class="mt-4">
            <p class="text-lg">Total Attempts: ${resultsToDisplay.length}</p>
            <p class="text-lg">Correct Answers: ${correctAnswers}</p>
            <p class="text-lg">Success Rate: ${successRate}%</p>
        </div>
    </div>
    `;

  document.body.appendChild(tempDiv);

  try {
    // Convert the div to canvas, using the same styles as the Table component
    const canvas = await html2canvas(tempDiv, {
      useCORS: true, // Include this if your logos are from a different origin
      allowTaint: true, // Use with caution - might be needed for some images
    });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.save('color-match-results.pdf');
  } finally {
    document.body.removeChild(tempDiv);
  }
};
