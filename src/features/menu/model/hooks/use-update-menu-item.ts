import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenuItem } from "../../api/update-menu-item";
import { ServiceResponse } from "@/shared/api/create-service";
import { MenuItem } from "@/entities/menu";

type UpdateMenuItemData = {
  id: string;
  updates: Partial<MenuItem>;
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation<ServiceResponse<MenuItem>, Error, UpdateMenuItemData>({
    mutationFn: updateMenuItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-item", variables.id] });
    },
  });
}; 