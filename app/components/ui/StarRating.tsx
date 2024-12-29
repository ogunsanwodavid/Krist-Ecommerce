import React from "react";

import { PiStarFill } from "react-icons/pi"; // Import PiStar icons

interface RatingProps {
  rating: number; // Rating out of 5
}

const StarRating: React.FC<RatingProps> = ({ rating }) => {
  // Ensure the rating is clamped between 0 and 5
  const normalizedRating = Math.floor(rating);

  return (
    <div className="flex items-center gap-x-[0.1rem]">
      {Array.from({ length: normalizedRating }, (_, index) => (
        <PiStarFill key={index} className="text-yellow-500 text-lg" />
      ))}
    </div>
  );
};

export default StarRating;
