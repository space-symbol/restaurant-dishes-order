import { z } from 'zod';

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(['APPETIZER', 'MAIN', 'DESSERT', 'DRINK']),
  availability: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  imageUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export const createMenuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(['APPETIZER', 'MAIN', 'DESSERT', 'DRINK']),
  availability: z.boolean().optional(),
  imageUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export const menuItemsResponseSchema = z.object({
  items: z.array(menuItemSchema),
  total: z.number(),
  from: z.number(),
  size: z.number(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;
export type CreateMenuItemDto = z.infer<typeof createMenuItemSchema>;
export type MenuItemsResponse = z.infer<typeof menuItemsResponseSchema>; 