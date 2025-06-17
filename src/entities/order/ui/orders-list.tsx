import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card } from "@/shared/ui/card";
import { formatCurrency } from "@/shared/lib/currency";
import { Order } from "../model/schemas";

interface OrdersListProps {
  sort?: "DATE_ASC" | "DATE_DESC";
  orders: Order[];
  isLoading: boolean;
}

export const OrdersList = (props: OrdersListProps) => {
  const { orders, isLoading } = props;

  let content = null;
  if (isLoading) {
    content = <div className="text-center">Загрузка заказов...</div>;
  }

  if (!orders.length) {
    content = <div className="text-center">У вас пока нет заказов</div>;
  } else {
    content = (
      <>
        {orders.map((order) => (
          <Card key={order.orderId} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
              <h3 className="font-medium">Заказ #{order.orderId}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(order.createdAt), "d MMMM yyyy, HH:mm", { locale: ru })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(order.totalPrice)}</p>
              <p className="text-sm text-gray-500">{order.status}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Количество позиций: {order.menuLineItems.length}
          </div>
        </Card>
      ))}
      </>
    )
  }

  return (
    <div className="space-y-4">
      {content}
    </div>
  );
}; 