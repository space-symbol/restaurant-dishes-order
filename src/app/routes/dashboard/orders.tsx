import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { Route } from "./+types";
import { useUserOrders } from "@/features/order/model/hooks/use-user-orders";
import { useUpdateOrderStatus } from "@/features/order/model/hooks/use-update-order-status";
import { Order } from "@/entities/order/model/schemas";
import { OrderStatus } from "@/entities/order/model/schemas";
import { Select, SelectOption } from "@/shared/ui/select";
import { toast } from "sonner";
import { formatCurrency } from "@/shared/lib/currency";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useParams } from "react-router";
import { OrdersList } from "@/entities/order/ui/orders-list";

const SORT_OPTIONS: SelectOption[] = [
  { value: "DATE_DESC", label: "Сначала новые" },
  { value: "DATE_ASC", label: "Сначала старые" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  NEW: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: `Savory | Управление заказами` },
    { name: "description", content: `Управление заказами` },
  ];
}

export default function DashboardOrders() {
  const [sort, setSort] = useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    error,
  } = useUserOrders({
    userName: "admin@example.com", // Для админа используем фиксированный email
    sort,
    from: currentPage * pageSize,
    size: pageSize,
  });

  const { updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const handleSortChange = (value: string) => {
    setSort(value as "DATE_ASC" | "DATE_DESC");
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const orders = response?.data?.items || [];
  const totalPages = Math.ceil(orders.length / pageSize);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await updateStatus({ orderId, status: newStatus });
      toast.success(`Статус заказа #${orderId} изменен на ${newStatus}`);
    } catch (error) {
      toast.error("Не удалось изменить статус заказа");
    }
  };

  return (
    <main className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Управление заказами</h1>
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
            {orders.map((order: Order) => (
              <Card key={order.orderId} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Заказ #{order.orderId}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), "d MMMM yyyy, HH:mm", { locale: ru })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.menuLineItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.menuItemName}</p>
                        <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Итого:</p>
                    <p className="text-lg font-bold">{formatCurrency(order.totalPrice)}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  {order.status === "NEW" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(order.orderId, "PROCESSING")}
                        disabled={isUpdating}
                      >
                        Подтвердить
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleStatusChange(order.orderId, "CANCELLED")}
                        disabled={isUpdating}
                      >
                        Отменить
                      </Button>
                    </>
                  )}
                  {order.status === "PROCESSING" && (
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(order.orderId, "COMPLETED")}
                      disabled={isUpdating}
                    >
                      Завершить
                    </Button>
                  )}
                </div>
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