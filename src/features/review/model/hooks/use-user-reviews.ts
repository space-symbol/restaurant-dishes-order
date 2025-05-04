import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../api/get-user-reviews";
import { ReviewPaginationParams } from "@/entities/review/model/types/types";

export const useUserReviews = (params?: ReviewPaginationParams) => {
  return useQuery({
    queryKey: ["reviews", "my", params],
    queryFn: () => getUserReviews(params),
  });
}; 