import { $api } from "@/shared/api/instance";
import { MenuItemWithRating } from "@/entities/menu-aggregate/model/types/types";
import { createService } from "@/shared/api/create-service";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { z } from "zod";
import { menuItemWithRatingSchema } from "../model/schemas";


const responseSchema = z.array(menuItemWithRatingSchema)

export const getMenuItemsWithRatings = createService(async (params?: {
  category?: MenuItemCategory;
  sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
}) => {
  const response = await $api.get<MenuItemWithRating[]>("/v1/menu-aggregate", { params });
  const parsedResponse = responseSchema.parse(response.data);
  return parsedResponse;
}); 