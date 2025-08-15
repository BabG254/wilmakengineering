import { useState, useEffect } from 'react';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  aspectRatio?: string;
};

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = '#e2e8f0',
  aspectRatio = '16/9'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      
      {/* Actual image */}
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
