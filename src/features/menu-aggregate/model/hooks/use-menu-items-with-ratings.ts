import { useQuery } from "@tanstack/react-query";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { getMenuItemsWithRatings } from "../../api/get-menu-items-with-ratings";

export const useMenuItemsWithRatings = (params?: {
  category?: MenuItemCategory;
  sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
}) => {
  return useQuery({
    queryKey: ["menu-aggregate", "items", params],
    queryFn: async () => await getMenuItemsWithRatings(params),
  });
}; 