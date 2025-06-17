import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { OrdersList } from "@/entities/order";
import { useUserOrders } from "@/features/order";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth";
import type { Route } from "@/app/routes/orders/+types/orders";

const DEFAULT_PAGE_SIZE = 10;

type UserOrdersProps = {
  initialData: Route.LoaderData;
};

export const UserOrders = ({ initialData }: UserOrdersProps) => {
  const [sortOrder, setSortOrder] = useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading } = useUserOrders({
    userName: user?.email || "user@example.com",
    sort: sortOrder,
    from: currentPage * DEFAULT_PAGE_SIZE,
    size: DEFAULT_PAGE_SIZE,
  }, {
    queryKey: ["user-orders", user?.email, sortOrder, currentPage],
    initialData: {
      data: {
        items: initialData.orders,
        total: initialData.total,
      }
    }
  });

  const totalPages = data?.data ? Math.ceil(data.data.total / DEFAULT_PAGE_SIZE) : 0;

  const handleSortChange = (newSort: "DATE_ASC" | "DATE_DESC") => {
    setSortOrder(newSort);
    setCurrentPage(0);
    navigate(`?sort=${newSort}&page=0`, { replace: true });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`?sort=${sortOrder}&page=${newPage}`, { replace: true });
  };

  return (
    <div className="flex flex-col flex-grow gap-6">
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button
            variant={sortOrder === "DATE_DESC" ? "primary" : "outline"}
            onClick={() => handleSortChange("DATE_DESC")}
          >
            Сначала новые
          </Button>
          <Button
            variant={sortOrder === "DATE_ASC" ? "primary" : "outline"}
            onClick={() => handleSortChange("DATE_ASC")}
          >
            Сначала старые
          </Button>
        </div>
      </div>

      <OrdersList 
        orders={data?.data?.items ?? []} 
        isLoading={isLoading} 
        sort={sortOrder}
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Назад
          </Button>
          <span className="flex items-center">
            Страница {currentPage + 1} из {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
}; 