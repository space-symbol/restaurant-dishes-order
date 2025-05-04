import { Star } from "lucide-react";
import cn from "../lib/cn";

interface RatingProps {
  rating: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Rating = ({ rating, className, size = "md" }: RatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= rating;
        const isHalfFilled = value - 0.5 <= rating && rating < value;
        
        return (
          <div key={value} className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
            {isHalfFilled && (
              <div className="absolute inset-0 overflow-hidden">
                <Star
                  className={cn(
                    sizeClasses[size],
                    "text-yellow-400 fill-yellow-400"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 