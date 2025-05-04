import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenuItem } from "../../api/create-menu-item";
import { menuKeys } from "../query-keys";
import { ServiceResponse } from "@/shared/api/create-service";
import { MenuItem, CreateMenuItemDto } from "@/entities/menu";

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation<ServiceResponse<MenuItem>, Error, CreateMenuItemDto>({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}; 