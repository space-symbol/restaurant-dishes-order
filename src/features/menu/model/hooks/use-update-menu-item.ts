import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenuItem } from "../../api/update-menu-item";

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-item", variables.id] });
    },
  });
}; 