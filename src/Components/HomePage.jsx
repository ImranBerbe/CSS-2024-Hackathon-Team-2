import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); // Store all images
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current background image
  const params = useParams();

  // Fetch images from Pexels API
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${params.id}&per_page=3`, // Fetch 3 images
        {
          headers: { Authorization: import.meta.env.VITE_PEXELS },
        }
      );
      const data = await response.json();
      if (data && data.photos && data.photos.length > 0) {
        const imageUrls = data.photos.map((photo) => photo.src.large); // Store all image URLs
        setImageUrls(imageUrls); // Set image list
        setCurrentImageIndex(0); // Set the first image as background
      } else {
        setError('No images found');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images');
    }
  };

  // Fetch quote from API Ninjas
  const fetchQuote = async () => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${params.id}`,
        {
          headers: { 'X-Api-Key': import.meta.env.VITE_REACT_APP_API_KEY },
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        setError('No quote found');
      }
    } catch (err) {
      console.error('Error fetching the quote:', err);
      setError('Failed to fetch the quote');
    }
  };

  // Fetch quote and images on component mount or when params.id changes
  useEffect(() => {
    fetchQuote();
    fetchImages();
  }, [params.id]); // Fetch data when category changes

  // Handle next button to shuffle background image and get a new quote
  const handleNext = () => {
    // Shuffle the background image
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // Cycle through the images

    // Fetch a new quote
    fetchQuote();
  };

  // Function to copy quote to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    alert('Quote copied to clipboard!');
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }} // Set background to current image
    >
        <div className='op-div'></div>
      <div className="bg-white bg-opacity-100 p-8 max-w-5xl rounded-lg shadow-md text-center kartica ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Random {params.id} Quote</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "{quote}"
            </blockquote>
            <p className="text-gray-600">- {author}</p>
          </div>
        )}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Next
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
