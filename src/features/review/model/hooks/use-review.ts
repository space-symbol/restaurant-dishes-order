import { useQuery } from "@tanstack/react-query";
import { getReview } from "../../api/get-review";
import { reviewKeys } from "../query-keys";

export const useReview = (id: string) => {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => getReview(id),
    enabled: !!id,
  });
}; 