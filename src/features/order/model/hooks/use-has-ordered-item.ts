import { useUserOrders } from "./use-user-orders";
import { Order } from "@/entities/order";

export const useHasOrderedItem = (menuItemId: string) => {
  const { data } = useUserOrders({});
  if (!data?.orders) return false;

  return data.orders.some((order: Order) => 
    order.items.some((item: { menuItemName: string }) => item.menuItemName === menuItemId)
  );
}; 