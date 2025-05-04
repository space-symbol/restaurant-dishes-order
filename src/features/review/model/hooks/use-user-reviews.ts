import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../api/get-user-reviews";
import { ReviewPaginationParams } from "@/entities/review/model/types/types";
import { reviewKeys } from "../query-keys";

export const useUserReviews = (params?: ReviewPaginationParams) => {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: () => getUserReviews(params),
  });
}; 