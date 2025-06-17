import { createService } from '@/shared/api/create-service';
import { menuItemsResponseSchema, MenuItemsResponse, MenuItemCategory, MenuItemSort } from '@/entities/menu/model/schemas';
import { $api } from '@/shared/api/instance';

export type GetMenuItemsParams = {
  category?: MenuItemCategory;
  sort?: MenuItemSort;
  from?: number;
  size?: number;
};

export const getMenuItems = createService<GetMenuItemsParams, MenuItemsResponse>(async (params) => {
  const response = await $api.get('/v1/menu-items', { params });
  return menuItemsResponseSchema.parse(response.data);
});