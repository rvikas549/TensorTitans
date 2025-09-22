import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay'; // 1. Import the new component

// This is mock data that mimics your Python backend's JSON response
const MOCK_RESULTS = {
  
  top_prediction: {
    breed: "Red Sindhi",
    confidence: 99.58
  },
  other_predictions: [
    { breed: "Sahiwal", confidence: 0.42 },
    { breed: "Fresian", confidence: 0.0 }
  ],
  heatmap_image: "https://i.imgur.com/g6y4V0s.jpeg" // Using a placeholder image for the heatmap
};


function App() {
  // 2. Add state for loading and results
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  // 3. Create a function to handle the classification logic
  const handleClassify = (imageFile) => {
    console.log("Starting classification for:", imageFile.name);
    setIsLoading(true);
    setResults(null); // Clear previous results

    // Simulate an API call to the backend
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsLoading(false);
    }, 2000); // Wait 2 seconds to mimic processing time
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-2xl mt-8">
        {/* 4. Pass the handler function to the uploader */}
        <ImageUploader onClassify={handleClassify} />

        {/* 5. Conditionally show loading or results */}
        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-xl text-gray-700">Classifying... 🐄</p>
          </div>
        )}
        
        <ResultsDisplay results={results} />
      </main>
    </div>
  );
}

export default App;