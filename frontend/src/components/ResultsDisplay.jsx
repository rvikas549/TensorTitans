import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { schemes } from '../data/schemes.js';

// Chart.js Registration (no changes)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- Helper Icon Component for Report Sections ---
const SectionIcon = ({ children }) => (
  <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
    {children}
  </div>
);

function ResultsDisplay({ results }) {
  if (!results) {
    return null;
  }

  // --- Data Preparation ---
  const topBreedName = results.top_prediction.breed;
  const relevantSchemes = schemes[topBreedName] || schemes['Default'];
  const allPredictions = [results.top_prediction, ...results.other_predictions];

  // Dummy Health Status Data
  const healthStatus = {
    status: "Healthy",
    lastCheck: "2025-09-22",
    recommendation: "Maintain current diet and exercise. Next check-up in 6 months."
  };

  // --- Chart Configuration ---
  const chartData = {
    labels: allPredictions.map(p => p.breed),
    datasets: [{
      label: 'Confidence Score (%)',
      data: allPredictions.map(p => p.confidence),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Prediction Confidence Scores', font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { callback: (value) => value + '%' } }
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl w-full mt-8 animate-fade-in border border-gray-200">
      
      {/* --- Report Header --- */}
      <div className="text-center border-b pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Livestock Analysis Report</h2>
        <p className="text-gray-500 mt-1">Generated on: {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* --- Section 1: Primary Identification --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">SPECIES</p>
          <p className="text-4xl font-extrabold text-gray-800 mt-2">{results.species}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center col-span-2">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">MOST LIKELY BREED</p>
          <p className="text-4xl font-extrabold text-blue-800 mt-2">
            {results.top_prediction.breed}
            <span className="text-2xl font-semibold text-blue-600 align-middle ml-2">({results.top_prediction.confidence}%)</span>
          </p>
        </div>
      </div>

      {/* --- Section 2: Prediction Analysis & Heatmap --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
        <div className="bg-gray-50 p-4 rounded-lg h-full">
          <Bar options={chartOptions} data={chartData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center h-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Geographical Distribution in India</h3>
          <p className="text-sm text-gray-500 mb-3">Commonly found in the northwestern regions.</p>
          {/* Dummy Map Image */}
          <img src="https://i.imgur.com/your-map-image.png" alt="Dummy map of India with breed distribution" className="w-full rounded-md shadow-md" />
        </div>
      </div>

      {/* --- Section 3: Health & Schemes --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Health Status Card */}
        <div className="border p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <SectionIcon>🩺</SectionIcon>
            <h3 className="text-xl font-bold text-gray-800">Health Status (Dummy)</h3>
          </div>
          <div className="text-left space-y-2">
            <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{healthStatus.status}</span></p>
            <p><strong>Last Check:</strong> {healthStatus.lastCheck}</p>
            <p><strong>Recommendation:</strong> {healthStatus.recommendation}</p>
          </div>
        </div>

        {/* Government Schemes Card */}
        <div className="border p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <SectionIcon>📜</SectionIcon>
            <h3 className="text-xl font-bold text-gray-800">Available Schemes</h3>
          </div>
          <div className="space-y-3">
            {relevantSchemes.map((scheme, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 hover:underline">{scheme.name}</a>
                <p className="text-gray-600 text-sm mt-1">{scheme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ResultsDisplay;