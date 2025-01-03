import React from "react";

import { PiStarFill, PiStarThin } from "react-icons/pi"; // Import PiStar icons

interface RatingProps {
  rating: number; // Rating out of 5
  starStyles?: string;
}

const StarRatingWithEmpty: React.FC<RatingProps> = ({ rating, starStyles }) => {
  // Ensure the rating is rounded up to the nearest whole number
  const normalizedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-x-[0.1rem]">
      {Array.from({ length: 5 }, (_, index) =>
        index < normalizedRating ? (
          <PiStarFill
            key={index}
            className={`text-yellow-500 text-lg md:text-xl ${starStyles}`}
          />
        ) : (
          <PiStarThin
            key={index}
            className={`text-yellow-500 text-lg md:text-xl ${starStyles}`}
          />
        )
      )}
    </div>
  );
};

export default StarRatingWithEmpty;
