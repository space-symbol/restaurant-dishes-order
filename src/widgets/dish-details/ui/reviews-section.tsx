import { useState, useMemo } from "react";
import { type Review, ReviewSort, ReviewList } from "@/entities/review";
import { Select, type SelectOption } from "@/shared/ui/select";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  averageRating: number;
  hasOrdered: boolean;
  className?: string;
}

const sortOptions: SelectOption[] = [
  { value: 'DATE_DESC', label: 'Сначала новые' },
  { value: 'DATE_ASC', label: 'Сначала старые' },
];

export const ReviewsSection = ({
  reviews,
  rating,
  averageRating,
  hasOrdered,
  className,
}: ReviewsSectionProps) => {
  const [sort, setSort] = useState<ReviewSort>('date_desc');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sort === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [reviews, sort]);

  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedReviews.slice(start, end);
  }, [sortedReviews, page, pageSize]);

  const totalPages = Math.ceil(reviews.length / pageSize);

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Отзывы клиентов</h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {rating} {rating === 1 ? 'отзыв' : 'отзывов'} • Средняя оценка: {averageRating.toFixed(1)}
          </p>
        </div>
        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value as ReviewSort);
            setPage(1);
          }}
          options={sortOptions}
          className="w-full sm:w-48"
        />
      </div>

      {!hasOrdered && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 text-sm sm:text-base text-blue-700">
          <p className="font-medium">Хотите поделиться своим мнением?</p>
          <p className="mt-1">Закажите это блюдо, чтобы оставить отзыв и помочь другим клиентам с выбором.</p>
        </div>
      )}

      <div className="mt-6">
        <ReviewList reviews={paginatedReviews} />
      </div>

      {reviews.length > 0 && (
        <div className="flex justify-center gap-3 pt-6 border-t mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors font-medium"
          >
            Назад
          </button>
          <span className="px-4 py-2 text-gray-600">
            Страница {page} из {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors font-medium"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}; 