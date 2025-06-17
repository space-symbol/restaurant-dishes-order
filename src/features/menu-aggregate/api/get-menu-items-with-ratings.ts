import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { RatedMenuItem } from "@/entities/menu-aggregate";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";
import { z } from "zod";

const paramsSchema = z.object({
  category: z.enum(["PASTA", "MEAT", "SALAD", "DESSERT", "DRINK", "BREAKFAST", "LUNCH"]).optional(),
  sortBy: z.enum([
    "AZ", "ZA", 
    "PRICE_ASC", "PRICE_DESC", 
    "DATE_ASC", "DATE_DESC",
    "RATE_ASC", "RATE_DESC"
  ]).optional()
});

export const getMenuItemsWithRatings = createService<z.infer<typeof paramsSchema>, RatedMenuItem[]>(async (params) => {
  const validatedParams = params ? paramsSchema.parse(params) : undefined;
  const response = await $api.get('/v1/menu-aggregate', { params: validatedParams });
  return response.data;
}); 