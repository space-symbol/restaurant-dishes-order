import { createService } from '@/shared/api/create-service';
import { menuItemsResponseSchema, MenuItemsResponse } from '@/entities/menu';
import { $api } from '@/shared/api/instance';

export type GetMenuItemsParams = {
  category?: 'APPETIZER' | 'MAIN' | 'DESSERT' | 'DRINK';
  sort?: 'PRICE_ASC' | 'PRICE_DESC' | 'NAME_ASC' | 'NAME_DESC';
  from?: number;
  size?: number;
};

export const getMenuItems = createService<GetMenuItemsParams, MenuItemsResponse>(async (params) => {
  const response = await $api.get<MenuItemsResponse>('/v1/menu-items', { params });
  return menuItemsResponseSchema.parse(response.data);
});