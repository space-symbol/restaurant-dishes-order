import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenuItem } from "../../api/create-menu-item";
import { menuKeys } from "../query-keys";

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}; 