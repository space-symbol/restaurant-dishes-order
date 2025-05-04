import { useQuery } from "@tanstack/react-query";
import { ReviewSort } from "@/entities/review/model/types/types";
import { getMenuItemWithReviews } from "../../api/get-menu-item-with-reviews";
import { menuAggregateKeys } from "../query-keys";

export const useMenuItemWithReviews = (data: {
  menuId: string;
  params?: {
    sort?: ReviewSort;
    from?: number;
    size?: number;
  };
}) => {
  return useQuery({
    queryKey: menuAggregateKeys.menuItemWithReviews(data.menuId),
    queryFn: async () => await getMenuItemWithReviews(data),
    enabled: !!data.menuId,
  });
}; 