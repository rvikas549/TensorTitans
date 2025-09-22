import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { schemes } from '../data/schemes.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ResultsDisplay({ results }) {
  if (!results) {
    return null;
  }

  const topBreedName = results.top_prediction.breed;
  const relevantSchemes = schemes[topBreedName] || schemes['Default'];
  
  const allPredictions = [results.top_prediction, ...results.other_predictions];
  const chartData = {
    labels: allPredictions.map(p => p.breed),
    datasets: [{
      label: 'Confidence Score (%)',
      data: allPredictions.map(p => p.confidence),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Confidence Score Distribution', font: { size: 18 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: function(value) { return value + '%' } }
      }
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Classification Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
          <p className="text-md text-gray-500 font-semibold uppercase tracking-wider">Species</p>
          <p className="text-5xl font-bold text-gray-800 mt-2">{results.species}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-sm text-center border border-blue-300">
          <p className="text-md text-blue-600 font-semibold uppercase tracking-wider">Top Breed</p>
          <p className="text-3xl font-bold text-blue-800 mt-2">{results.top_prediction.breed}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
          <p className="text-md text-gray-500 font-semibold uppercase tracking-wider">Confidence</p>
          <p className="text-5xl font-bold text-gray-800 mt-2">{results.top_prediction.confidence}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-50 p-4 rounded-lg">
          <Bar options={chartOptions} data={chartData} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Focus (Heatmap)</h3>
          {/* Heatmap image is not yet in backend response, using placeholder */}
          <img src="https://i.imgur.com/g6y4V0s.jpeg" alt="Heatmap placeholder" className="w-full rounded-md shadow-lg" />
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Available Government Schemes & Support
        </h3>
        <div className="space-y-4">
          {relevantSchemes.map((scheme, index) => (
            <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-lg text-green-800">{scheme.name}</h4>
              <p className="text-gray-700 mt-1">{scheme.description}</p>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline font-semibold mt-2 inline-block"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;