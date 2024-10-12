import React, { useState, useEffect } from 'react';


// List of emotions
const emotions = ["anger", "failure", "happiness", "fear", "courage", "beauty", "amazing"];

const DailyQuotes = () => {
  const [quotes, setQuotes] = useState([]); // Store quotes for all emotions
  const [images, setImages] = useState([]); // Store images for all emotions
  const [error, setError] = useState(null);

  // Fetch quotes and images for all emotions
  const fetchQuotesAndImages = async () => {
    const fetchedQuotes = [];
    const fetchedImages = [];

    // Loop through each emotion to fetch quotes and images
    for (const emotion of emotions) {
      try {
        // Fetch quote
        const quoteResponse = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=${emotion}`,
          {
            headers: { 'X-Api-Key': import.meta.env.VITE_REACT_APP_API_KEY },
          }
        );
        const quoteData = await quoteResponse.json();
        if (quoteData && quoteData.length > 0) {
          fetchedQuotes.push({
            emotion,
            quote: quoteData[0].quote,
            author: quoteData[0].author,
          });
        } else {
          fetchedQuotes.push({ emotion, quote: 'No quote found', author: '' });
        }
      } catch (err) {
        console.error('Error fetching the quote:', err);
        fetchedQuotes.push({ emotion, quote: 'Failed to fetch quote', author: '' });
      }

      try {
        // Fetch images
        const imageResponse = await fetch(
          `https://api.pexels.com/v1/search?query=${emotion}&per_page=1`, // Fetch 1 image per emotion
          {
            headers: { Authorization: import.meta.env.VITE_PEXELS },
          }
        );
        const imageData = await imageResponse.json();
        if (imageData && imageData.photos && imageData.photos.length > 0) {
          fetchedImages.push(imageData.photos[0].src.large);
        } else {
          fetchedImages.push('');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        fetchedImages.push('');
      }
    }

    setQuotes(fetchedQuotes);
    setImages(fetchedImages);
  };

  useEffect(() => {
    fetchQuotesAndImages();
  }, []);

  return (
    <div className="flex flex-col items-center m-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 align-center column-gap:5px">
        {quotes.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 relative">
            {images[index] && (
              <img
                src={images[index]}
                alt={item.emotion}
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
              />
            )}
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.emotion}</h2>
              <blockquote className="italic text-gray-700 mb-2">
                "{item.quote}"
              </blockquote>
              <p className="text-gray-600">- {item.author}</p>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DailyQuotes;
