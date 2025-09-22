import React from 'react';
// 1. Import chart components
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

// 2. Register the components Chart.js needs to work
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

  // 3. Prepare the data for the bar chart
  const allPredictions = [results.top_prediction, ...results.other_predictions];
  
  const chartData = {
    labels: allPredictions.map(p => p.breed), // e.g., ['Red Sindhi', 'Sahiwal', 'Fresian']
    datasets: [
      {
        label: 'Confidence Score',
        data: allPredictions.map(p => p.confidence), // e.g., [99.58, 0.42, 0.0]
        backgroundColor: [
            'rgba(54, 162, 235, 0.6)', // Blue for the top prediction
            'rgba(255, 159, 64, 0.6)', // Orange
            'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y', // This makes the bar chart horizontal
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // We don't need a legend for a single dataset
      },
      title: {
        display: true,
        text: 'Top 3 Breed Predictions',
        font: { size: 16 }
      },
    },
    scales: {
        x: {
            ticks: {
                callback: function(value) {
                    return value + '%' // Add a '%' sign to the x-axis ticks
                }
            }
        }
    }
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Classification Results</h2>
      
      {/* Container for the new layout (Chart on left, details on right) */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Bar Chart */}
        <div>
          <Bar options={chartOptions} data={chartData} />
        </div>

        {/* Right Side: Details and Heatmap */}
        <div>
           {/* Top Prediction Highlight */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-gray-600">Top Prediction:</p>
            <p className="text-3xl font-bold text-blue-700">{results.top_prediction.breed}</p>
            <p className="text-xl text-gray-800 mt-1">
              Confidence: <span className="font-semibold">{results.top_prediction.confidence}%</span>
            </p>
          </div>
          
          {/* Heatmap */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">AI Focus (Heatmap)</h3>
            <img src={results.heatmap_image} alt="Heatmap" className="w-full rounded-md shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;