import { useQuery } from "@tanstack/react-query";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu";
import { getMenuItems } from "../../api/get-menu-items";

export const useMenuItems = (params?: {
  category?: MenuItemCategory;
  sort?: MenuItemSort;
}) => {
  return useQuery({
    queryKey: ["menu-items", params],
    queryFn: () => getMenuItems(params),
  });
}; 