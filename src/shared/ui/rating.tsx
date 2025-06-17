import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface RatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  className?: string;
}

export const Rating = ({
  rating,
  onRatingChange,
  maxRating = 5,
  className = "",
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(maxRating)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onRatingChange(i + 1)}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <StarIcon
            className={`w-8 h-8 ${
              i < (hoverRating || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}; 