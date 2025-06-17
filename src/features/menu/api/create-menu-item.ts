import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { menuItemSchema } from "@/entities/menu/model/schemas";
import { z } from "zod";

const createMenuItemSchema = menuItemSchema.omit({ id: true, createdAt: true, updatedAt: true });
type CreateMenuItem = z.infer<typeof createMenuItemSchema>;
type Response = z.infer<typeof menuItemSchema>;

export const createMenuItem = createService<CreateMenuItem, Response>(async (data) => {
  const validatedData = createMenuItemSchema.parse(data);
  const response = await $api.post('/v1/menu-items', validatedData);
  return menuItemSchema.parse(response.data);
});
