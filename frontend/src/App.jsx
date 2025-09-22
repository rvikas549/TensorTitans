import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';

// The URL of your running Flask backend API
const API_ENDPOINT = "http://localhost:5000/api/predict";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null); // State to hold any API errors

  // This function will now handle the actual API call
  const handleClassify = async (imageFile) => {
    if (!imageFile) return;

    console.log("Sending image to backend...", imageFile.name);
    setIsLoading(true);
    setResults(null);
    setError(null);

    // 1. Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      // 2. Use 'fetch' to send the image to the Flask API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // 3. Get the JSON results from the backend
      const data = await response.json();
      console.log("Received from backend:", data);
      
      // 4. Update the state with the real results
      setResults(data);

    } catch (err) {
      console.error("Failed to classify image:", err);
      setError("Failed to get a result. Please try another image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-4xl mt-8"> {/* Increased max-width for better layout */}
        <ImageUploader onClassify={handleClassify} isLoading={isLoading} />

        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-xl text-gray-700 animate-pulse">Classifying... 🐄</p>
          </div>
        )}

        {error && (
            <div className="mt-8 text-center bg-red-100 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
            </div>
        )}
        
        {/* The ResultsDisplay component will show the real data now */}
        <ResultsDisplay results={results} />
      </main>
    </div>
  );
}

export default App;