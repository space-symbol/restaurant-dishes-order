import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { menuItemSchema } from "@/entities/menu/model/schemas";
import { z } from "zod";

type Response = z.infer<typeof menuItemSchema>;

export const getMenuItem = createService(async (id: string) => {
  const response = await $api.get<Response>(`/v1/menu-items/${id}`);
  return menuItemSchema.parse(response.data);
}); 