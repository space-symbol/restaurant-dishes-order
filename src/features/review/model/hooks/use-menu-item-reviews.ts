import { useQuery } from "@tanstack/react-query";
import { getMenuItemReviews } from "../../api/get-menu-item-reviews";
import { ReviewPaginationParams } from "@/entities/review";
import { reviewKeys } from "../query-keys";

export const useMenuItemReviews = (data: {
  menuId: number;
  params?: ReviewPaginationParams;
}) => {
  return useQuery({
    queryKey: reviewKeys.byMenuItem(String(data.menuId)),
    queryFn: () => getMenuItemReviews(data),
    enabled: !!data.menuId,
  });
}; 