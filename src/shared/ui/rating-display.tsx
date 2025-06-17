import { StarIcon } from "@heroicons/react/24/solid";

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  className?: string;
  showValue?: boolean;
}

export const RatingDisplay = ({
  rating,
  maxRating = 5,
  className = "",
  showValue = false,
}: RatingDisplayProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex gap-0.5">
        {[...Array(maxRating)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}; 