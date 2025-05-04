import { useQuery } from "@tanstack/react-query";
import { getMenuItemReviews } from "../api/get-menu-item-reviews";
import { ReviewPaginationParams } from "@/entities/review/model/types/types";

export const useMenuItemReviews = (data: {
  menuItemId: string;
  params?: ReviewPaginationParams;
}) => {
  return useQuery({
    queryKey: ["reviews", "menu-item", data.menuItemId, data.params],
    queryFn: () => getMenuItemReviews(data),
    enabled: !!data.menuItemId,
  });
}; 