// src/components/LandingPage.jsx
import React, { useState } from 'react';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const emotions = ["anger", "failure", "happiness", "fear", "courage", "beauty", "amazing"];



const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  

  const goToNext = () => {
    const newIndex = currentIndex === emotions.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    sendToAPI(emotions[newIndex]);  // Send the new emotion to the API
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? emotions.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    sendToAPI(emotions[newIndex]);  // Send the new emotion to the API
  };

  // Function to navigate to MainPage
  const 
  
  
  
  goToMainPage = (em) => {
    
    navigate(`/next/${em}`);
  };

  return (
    
    <div className="flex flex-col justify-center items-center h-screen bg-pink-100">
      <h1 className="text-4xl font-bold emotion text-pink-700 mb-16 mt-16 ">What are you feeling right now?</h1>
      {/* Display Current Emotion */}
      <div className="bg-white shadow-lg rounded-lg w-80 h-40 flex items-center justify-center box">
        <h1 className="text-4xl font-bold text-pink-600 emotion">{emotions[currentIndex]}</h1>
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-between items-center mt-6 space-x-6">
        <button
          onClick={goToPrevious}
          className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-blue-400"
        >
          <GoArrowLeft />
        </button>
      <button
         onClick={(e) => goToMainPage(emotions[currentIndex])} // Use the function to navigate
        className="bg-blue-400 text-white py-2 px-4 mt-6 rounded-full hover:bg-pink-700 transition duration-300"
      >
        Submit
      </button>
        <button
          onClick={goToNext}
          className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-blue-400"
        >
          <GoArrowRight />
        </button>
      </div>

      {/* Button to navigate to MainPage */}
    </div>
  );
};

export default LandingPage;
