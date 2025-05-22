'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

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
    </div>
  );
};

export default ImageCarousel; 