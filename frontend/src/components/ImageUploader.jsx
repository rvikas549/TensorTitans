import React, { useState } from 'react';

function ImageUploader({onClassify,isLoading}) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClassify = () => {
    // This is where we will send the image to the Python backend
    // For now, it will just log to the console.
    onClassify(image);
    console.log("Classifying image:", image.name);
    alert("Classification logic will be connected here!");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Image Preview:</p>
            <img src={imagePreview} alt="Preview" className="mx-auto mt-2 rounded-md max-h-60" />
          </div>
        )}
      </div>

      <button
        onClick={handleClassify}
        disabled={!image || isLoading}
        className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg
                   hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors duration-300"
      >
       {isLoading ? 'Classifying..' :'Classify Breed'}
      </button>
    </div>
  );
}

export default ImageUploader;