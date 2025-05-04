import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuItem } from "../../api/delete-menu-item";
import { ServiceResponse } from "@/shared/api/create-service";

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation<ServiceResponse<null>, Error, string>({
    mutationFn: deleteMenuItem,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-item", id] });
    },
  });
}; 