import { useQuery } from "@tanstack/react-query";
import { getMenuItemsRatings } from "../../api/get-menu-items-ratings";
import { reviewKeys } from "../query-keys";

export const useMenuItemsRatings = (menuItemIds: string[]) => {
  return useQuery({
    queryKey: reviewKeys.menuItemRatings(menuItemIds),
    queryFn: () => getMenuItemsRatings(menuItemIds.map(id => parseInt(id))),
    enabled: menuItemIds.length > 0,
  });
}; 