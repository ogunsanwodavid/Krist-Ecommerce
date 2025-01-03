import React from "react";

import { PiStarFill } from "react-icons/pi"; // Import PiStar icons

interface RatingProps {
  rating: number; // Rating out of 5
  starStyles?: string;
}

const StarRating: React.FC<RatingProps> = ({ rating, starStyles }) => {
  // Ensure the rating is rounded up to the nearest whole number
  const normalizedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-x-[0.1rem]">
      {Array.from({ length: normalizedRating }, (_, index) => (
        <PiStarFill
          key={index}
          className={`text-yellow-500 text-lg ${starStyles}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
