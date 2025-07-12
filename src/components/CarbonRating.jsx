import React from 'react';
import { Star } from 'lucide-react';

export const CarbonRating = ({ 
  rating, 
  size = 'md', 
  showNumber = true 
}) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-6 h-6';
      default: return 'w-4 h-4';
    }
  };

  const getStarColor = (starIndex) => {
    const fillLevel = clampedRating - starIndex;
    
    if (fillLevel <= 0) {
      // Empty star - red
      return 'text-red-500';
    } else if (fillLevel >= 1) {
      // Full star - gradient from red to green based on rating
      const greenIntensity = Math.min(clampedRating / 5, 1);
      if (greenIntensity < 0.4) return 'text-red-500';
      if (greenIntensity < 0.6) return 'text-orange-500';
      if (greenIntensity < 0.8) return 'text-yellow-500';
      return 'text-green-500';
    } else {
      // Partial star
      const greenIntensity = Math.min(clampedRating / 5, 1);
      if (greenIntensity < 0.4) return 'text-red-500';
      if (greenIntensity < 0.6) return 'text-orange-500';
      if (greenIntensity < 0.8) return 'text-yellow-500';
      return 'text-green-500';
    }
  };

  const getRatingColor = () => {
    const greenIntensity = Math.min(clampedRating / 5, 1);
    if (greenIntensity < 0.4) return 'text-red-600';
    if (greenIntensity < 0.6) return 'text-orange-600';
    if (greenIntensity < 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`${getSizeClasses()} ${getStarColor(index)} ${
              clampedRating > index ? 'fill-current' : ''
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`text-sm font-medium ${getRatingColor()}`}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};