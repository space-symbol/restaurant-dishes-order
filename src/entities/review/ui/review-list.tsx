import { Review } from "@/entities/review/model/schemas";
import { StarIcon } from "@heroicons/react/24/solid";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-500 text-center py-4">Пока нет отзывов</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < review.rate ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-2">{review.comment}</p>
          <div className="text-xs sm:text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      ))}
    </div>
  );
}; 