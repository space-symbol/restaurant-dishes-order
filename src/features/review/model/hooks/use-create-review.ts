import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../api/create-review";
import { reviewKeys } from "../query-keys";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}; 