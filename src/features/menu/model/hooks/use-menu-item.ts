import { useQuery } from "@tanstack/react-query";
import { getMenuItem } from "../../api/get-menu-item";

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => getMenuItem(id),
    enabled: !!id,
  });
}; 