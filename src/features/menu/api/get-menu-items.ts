import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { menuItemSchema, menuItemCategorySchema, menuItemSortSchema } from "@/entities/menu/model/schemas";
import { z } from "zod";

const responseSchema = z.array(menuItemSchema);
type Response = z.infer<typeof responseSchema>;

const paramsSchema = z.object({
  category: menuItemCategorySchema.optional(),
  sort: menuItemSortSchema.optional(),
});

export const getMenuItems = createService(async (params?: z.infer<typeof paramsSchema>) => {
  const validatedParams = params ? paramsSchema.parse(params) : undefined;
  const response = await $api.get<Response>("/v1/menu-items", { params: validatedParams });
  return responseSchema.parse(response.data);
}); 