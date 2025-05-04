import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuItem } from "../../api/delete-menu-item";

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-item", id] });
    },
  });
}; 