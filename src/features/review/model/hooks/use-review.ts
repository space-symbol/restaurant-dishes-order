import { useQuery } from "@tanstack/react-query";
import { getReview } from "../api/get-review";

export const useReview = (id: string) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id),
    enabled: !!id,
  });
}; 