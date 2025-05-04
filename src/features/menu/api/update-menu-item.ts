import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { menuItemSchema } from "@/entities/menu/model/schemas";
import { z } from "zod";

const updateMenuItemSchema = menuItemSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();
type UpdateMenuItem = z.infer<typeof updateMenuItemSchema>;
type Response = z.infer<typeof menuItemSchema>;

export const updateMenuItem = createService(async (data: {
  id: string;
  updates: UpdateMenuItem;
}) => {
  const validatedUpdates = updateMenuItemSchema.parse(data.updates);
  const response = await $api.patch<Response>(`/v1/menu-items/${data.id}`, validatedUpdates);
  return menuItemSchema.parse(response.data);
}); 