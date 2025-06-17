import { useQuery } from "@tanstack/react-query";
import { ReviewSort } from "@/entities/review";
import { getMenuItemWithReviews } from "../../api/get-menu-item-with-reviews";
import { menuAggregateKeys } from "../query-keys";

export const useMenuItemWithReviews = (data: {
  menuId: number;
  params?: {
    sort?: ReviewSort;
    from?: number;
    size?: number;
  };
}) => {
  return useQuery({
    queryKey: menuAggregateKeys.menuItemWithReviews(String(data.menuId)),
    queryFn: async () => await getMenuItemWithReviews({
      menuId: data.menuId,
      sortBy: data.params?.sort
    }),
    enabled: !!data.menuId,
  });
}; 