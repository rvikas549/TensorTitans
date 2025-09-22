import React from 'react';
// Import chart components (no changes here)
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components (no changes here)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResultsDisplay({ results }) {
  if (!results) {
    return null;
  }

  // --- Chart Configuration ---

  // 1. Prepare data for the bar chart
  const allPredictions = [results.top_prediction, ...results.other_predictions];
  const chartData = {
    labels: allPredictions.map(p => p.breed),
    datasets: [
      {
        label: 'Confidence Score (%)',
        data: allPredictions.map(p => p.confidence),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)', // Stronger blue for the top prediction
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  // 2. Updated chart options for a VERTICAL bar chart
  const chartOptions = {
    // indexAxis: 'y', // <-- REMOVED this line to make the chart vertical
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Confidence Score Distribution',
        font: { size: 18 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%'; // Add '%' to the y-axis
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Classification Results</h2>
      
      {/* Main grid for Species, Top Prediction, and Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Card 1: Species Identification */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
          <p className="text-md text-gray-500 font-semibold uppercase tracking-wider">Species</p>
          <p className="text-5xl font-bold text-gray-800 mt-2">{results.species}</p>
        </div>

        {/* Card 2: Top Breed Prediction */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-sm text-center border border-blue-300">
          <p className="text-md text-blue-600 font-semibold uppercase tracking-wider">Top Breed</p>
          <p className="text-3xl font-bold text-blue-800 mt-2">{results.top_prediction.breed}</p>
        </div>
        
        {/* Card 3: Confidence Score */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
          <p className="text-md text-gray-500 font-semibold uppercase tracking-wider">Confidence</p>
          <p className="text-5xl font-bold text-gray-800 mt-2">{results.top_prediction.confidence}%</p>
        </div>

      </div>

      {/* Grid for Chart and Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Vertical Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <Bar options={chartOptions} data={chartData} />
        </div>

        {/* Right Side: Heatmap Visualization */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Focus (Heatmap)</h3>
          <img src={results.heatmap_image} alt="Heatmap" className="w-full rounded-md shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;