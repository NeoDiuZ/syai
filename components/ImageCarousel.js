'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Remove automatic slideshow effect by commenting out useEffect
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, interval);
  //   return () => clearInterval(timer);
  // }, [images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Carousel image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0} // Prioritize loading the first image
          />
           <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10"></div>
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full focus:outline-none transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full focus:outline-none transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel; 