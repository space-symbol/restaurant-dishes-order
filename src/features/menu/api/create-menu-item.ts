import { createService } from '@/shared/api/create-service';
import { menuItemSchema, MenuItem, CreateMenuItemDto } from '@/entities/menu';
import { $api } from '@/shared/api/instance';

export const createMenuItem = createService<CreateMenuItemDto, MenuItem>(async (data) => {
  const response = await $api.post<MenuItem>('/v1/menu-items', data);
  return menuItemSchema.parse(response.data);
});
