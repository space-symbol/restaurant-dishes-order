import { useUserOrders } from "./use-user-orders";

export const useHasOrderedItem = (menuItemId: string) => {
  const { data } = useUserOrders({});
  if (!data) return false;

  return data.some(order => 
    order.items.some(item => item.menuItemId === menuItemId)
  );
}; 