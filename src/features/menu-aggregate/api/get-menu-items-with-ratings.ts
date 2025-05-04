import { $api } from "@/shared/api/instance";
import { MenuItemWithRating } from "@/entities/menu-aggregate/model/types/types";
import { createService } from "@/shared/lib/create-service";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";

export const getMenuItemsWithRatings = createService(async (params?: {
  category?: MenuItemCategory;
  sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
}) => {
  const response = await $api.get<MenuItemWithRating[]>("/v1/menu-aggregate", { params });
  return response.data;
}); 