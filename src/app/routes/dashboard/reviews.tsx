import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { Route } from "./+types";
import { useUserReviews } from "@/features/review";
import { Review, ReviewSort, ReviewPaginationParams } from "@/entities/review/model/types/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { Select, SelectOption } from "@/shared/ui/select";
import { toast } from "sonner";
import { ServiceResponse } from "@/shared/api/create-service";

const SORT_OPTIONS: SelectOption[] = [
  { value: "DATE_DESC", label: "Сначала новые" },
  { value: "DATE_ASC", label: "Сначала старые" },
  { value: "RATING_DESC", label: "По убыванию рейтинга" },
  { value: "RATING_ASC", label: "По возрастанию рейтинга" },
];

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: `Savory | Управление отзывами` },
    { name: "description", content: `Управление отзывами` },
  ];
}

export default function DashboardReviews() {
  const [sort, setSort] = useState<ReviewSort>("DATE_DESC");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    error,
  } = useUserReviews({
    from: currentPage * pageSize,
    size: pageSize,
    sort,
  });

  const handleSortChange = (value: string) => {
    setSort(value as ReviewSort);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const reviews = response?.data || [];
  const totalPages = Math.ceil(reviews.length / pageSize);

  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Управление отзывами</h1>
      </div>

      <div className="flex gap-4 items-center">
        <Select
          value={sort}
          onValueChange={handleSortChange}
          options={SORT_OPTIONS}
          className="w-96"
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {reviews.map((review: Review) => (
              <Card key={review.reviewId} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Отзыв #{review.reviewId}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Назад
              </Button>
              <span className="px-4 py-2">
                Страница {currentPage + 1} из {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Вперед
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
} 