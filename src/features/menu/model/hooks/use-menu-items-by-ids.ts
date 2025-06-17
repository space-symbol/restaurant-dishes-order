import { useQueries } from "@tanstack/react-query";
import { getMenuItem } from "../../api/get-menu-item";
import { MenuItem } from "@/entities/menu";

export const useMenuItemsByIds = (ids: number[]) => {
  const queries = useQueries({
    queries: (ids || []).map((id) => ({
      queryKey: ["menu-item", id.toString()],
      queryFn: () => getMenuItem(id.toString()),
      enabled: !!id && (ids?.length || 0) > 0,
    })),
  });

  const menuItems: MenuItem[] = [];
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error;

  queries.forEach((query) => {
    if (query.data?.data) {
      menuItems.push(query.data.data);
    }
  });

  return {
    data: menuItems,
    isLoading,
    error,
  };
}; 