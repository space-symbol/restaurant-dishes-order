import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { OrdersList } from "@/entities/order";
import { useUserOrders } from "@/features/order";

const DEFAULT_PAGE_SIZE = 10;

export const UserOrders = () => {
  const [sortOrder, setSortOrder] = useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useUserOrders({
    sort: sortOrder,
    from: currentPage * DEFAULT_PAGE_SIZE,
    size: DEFAULT_PAGE_SIZE,
  });

  const totalPages = data?.data ? Math.ceil(data.data.total / DEFAULT_PAGE_SIZE) : 0;

  return (
    <div className="flex flex-col flex-grow gap-6">
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button
            variant={sortOrder === "DATE_DESC" ? "primary" : "outline"}
            onClick={() => {
              setSortOrder("DATE_DESC");
              setCurrentPage(0);
            }}
          >
            Сначала новые
          </Button>
          <Button
            variant={sortOrder === "DATE_ASC" ? "primary" : "outline"}
            onClick={() => {
              setSortOrder("DATE_ASC");
              setCurrentPage(0);
            }}
          >
            Сначала старые
          </Button>
        </div>
      </div>

      <OrdersList 
        orders={data?.data?.orders ?? []} 
        isLoading={isLoading} 
        sort={sortOrder}
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Назад
          </Button>
          <span className="flex items-center">
            Страница {currentPage + 1} из {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
}; 