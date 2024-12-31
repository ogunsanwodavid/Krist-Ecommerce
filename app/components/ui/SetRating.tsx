import { useState } from "react";
import { PiStarFill, PiStarThin } from "react-icons/pi";

interface SetRatingProps {
  initialRating?: number; // Default initial rating is 1
  maxStars?: number; // Default max stars is 5
  ratingValue: number;
  onRatingChange: (rating: number) => void; // Callback to get the rating
}

export default function SetRating({
  initialRating = 1,
  maxStars = 5,
  ratingValue,
  onRatingChange,
}: SetRatingProps) {
  const [rating, setRating] = useState<number>(ratingValue || initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSetRating = (value: number) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex gap-x-[0.1rem]">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating
          ? starValue <= hoverRating
          : starValue <= rating;

        return (
          <div
            key={starValue}
            onClick={() => handleSetRating(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer "
          >
            {isFilled ? (
              <PiStarFill className="text-yellow-400 text-lg" />
            ) : (
              <PiStarThin className="text-gray-400 text-lg" />
            )}
          </div>
        );
      })}
    </div>
  );
}
