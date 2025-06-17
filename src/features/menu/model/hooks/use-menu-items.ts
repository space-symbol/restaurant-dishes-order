import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../api/get-menu-items";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";

interface UseMenuItemsProps {
  category?: MenuItemCategory;
  sort?: MenuItemSort;
  from?: number;
  size?: number;
}

export const useMenuItems = ({ category, sort, from, size }: UseMenuItemsProps = {}) => {
  return useQuery({
    queryKey: ["menu-items", { category, sort, from, size }],
    queryFn: async () => {
      const response = await getMenuItems({
        category,
        sort,
        from,
        size
      });
      return response.data;
    }
  });
}; 