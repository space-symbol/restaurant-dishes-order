import { useQuery } from "@tanstack/react-query";
import { getMenuItemsRatings } from "../api/get-menu-items-ratings";

export const useMenuItemsRatings = (menuItemIds: string[]) => {
  return useQuery({
    queryKey: ["menu-items-ratings", menuItemIds],
    queryFn: () => getMenuItemsRatings(menuItemIds),
    enabled: menuItemIds.length > 0,
  });
}; 