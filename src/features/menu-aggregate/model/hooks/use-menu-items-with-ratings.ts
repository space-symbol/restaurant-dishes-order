import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";
import { getMenuItemsWithRatings } from "../../api/get-menu-items-with-ratings";
import { RatedMenuItem } from "@/entities/menu-aggregate/model/schemas";

export const useMenuItemsWithRatings = (
  params?: {
    category?: MenuItemCategory;
    sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
  },
  options?: Omit<UseQueryOptions<RatedMenuItem[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<RatedMenuItem[]>({
    queryKey: ["menu-aggregate", "items", params],
    queryFn: async () => {
      const response = await getMenuItemsWithRatings({
        category: params?.category,
        sortBy: params?.sort
      });
      return response.data;
    },
    ...options,
  });
}; 