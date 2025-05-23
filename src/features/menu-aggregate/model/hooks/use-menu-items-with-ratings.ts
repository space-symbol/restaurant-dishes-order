import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { getMenuItemsWithRatings } from "../../api/get-menu-items-with-ratings";

type MenuItemsResponse = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    category: MenuItemCategory;
    availability: boolean;
    createdAt: string;
    updatedAt: string;
    rating: {
      menuItemId: string;
      averageRating: number;
      totalReviews: number;
    };
    imageUrl?: string;
    featured?: boolean;
  }>;
  total: number;
};

export const useMenuItemsWithRatings = (
  params?: {
    category?: MenuItemCategory;
    sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
  },
  options?: Omit<UseQueryOptions<MenuItemsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ["menu-aggregate", "items", params],
    queryFn: async () => {
      const response = await getMenuItemsWithRatings(params);
      return response.data ?? { items: [], total: 0 };
    },
    ...options,
  });
}; 