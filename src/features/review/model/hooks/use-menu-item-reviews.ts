import { useQuery } from "@tanstack/react-query";
import { getMenuItemReviews } from "../../api/get-menu-item-reviews";
import { ReviewPaginationParams } from "@/entities/review/model/types/types";
import { reviewKeys } from "../query-keys";

export const useMenuItemReviews = (data: {
  menuItemId: string;
  params?: ReviewPaginationParams;
}) => {
  return useQuery({
    queryKey: reviewKeys.byMenuItem(data.menuItemId),
    queryFn: () => getMenuItemReviews(data),
    enabled: !!data.menuItemId,
  });
}; 