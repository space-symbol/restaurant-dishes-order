import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useState, useMemo } from "react";
import { Route } from "./+types";
import { useUserReviews } from "@/features/review";
import { Review, ReviewSort } from "@/entities/review/model/schemas";
import { StarIcon } from "@heroicons/react/24/solid";
import { Select, SelectOption } from "@/shared/ui/select";
import { toast } from "sonner";
import { ServiceResponse } from "@/shared/api/create-service";
import { useMenuItemsByIds } from "@/features/menu";
import { MenuItemPreview } from "@/entities/menu";

const SORT_OPTIONS: SelectOption[] = [
  { value: "date_desc", label: "Сначала новые" },
  { value: "date_asc", label: "Сначала старые" },
  { value: "rate_desc", label: "По убыванию рейтинга" },
  { value: "rate_asc", label: "По возрастанию рейтинга" },
];

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: `Savory | Управление отзывами` },
    { name: "description", content: `Управление отзывами` },
  ];
}

export default function DashboardReviews() {
  const [sort, setSort] = useState<ReviewSort>("date_desc");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    error,
  } = useUserReviews({
    from: currentPage * pageSize,
    size: pageSize,
    sortBy: sort,
  });

  console.log('useUserReviews params:', { from: currentPage * pageSize, size: pageSize, sortBy: sort });
  console.log('useUserReviews response:', response);

  const reviews = response?.data || [];
  
  // Получаем уникальные ID блюд из отзывов
  const menuIds = useMemo(() => {
    const uniqueIds = [...new Set(reviews.map(review => review.menuId))];
    console.log('Extracted menuIds from reviews:', uniqueIds);
    console.log('Reviews with menuIds:', reviews.map(review => ({ id: review.id, menuId: review.menuId })));
    return uniqueIds;
  }, [reviews]);

  // Загружаем информацию о блюдах
  const {
    data: menuItems,
    isLoading: menuItemsLoading,
  } = useMenuItemsByIds(menuIds);

  console.log('useMenuItemsByIds result:', { menuItems, menuItemsLoading, menuIds });

  // Создаем Map для быстрого поиска блюд по ID
  const menuItemsMap = useMemo(() => {
    const map = new Map();
    menuItems.forEach(item => map.set(item.id, item));
    console.log('menuItemsMap created:', Array.from(map.entries()));
    return map;
  }, [menuItems]);

  const handleSortChange = (value: string) => {
    console.log('Sort changed to:', value);
    setSort(value as ReviewSort);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(reviews.length / pageSize);

  return (
    <main className="flex flex-col gap-6 h-full">
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
          <div className="grid grid-cols-1 gap-6 overflow-y-auto h-full">
            {reviews.map((review: Review) => {
              const menuItem = menuItemsMap.get(review.menuId);
              
              return (
                <Card key={review.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Отзыв #{review.id}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rate ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Превью блюда */}
                  {menuItem && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Блюдо:</h4>
                      <MenuItemPreview menuItem={menuItem} />
                    </div>
                  )}
                  
                  {menuItemsLoading && !menuItem && (
                    <div className="mb-4">
                      <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
                    </div>
                  )}
                  
                  <p className="text-gray-600">{review.comment}</p>
                </Card>
              );
            })}
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