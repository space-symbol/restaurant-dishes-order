import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";

export const deleteMenuItem = createService(async (id: string) => {
  await $api.delete(`/v1/menu-items/${id}`);
  return null;
}); 