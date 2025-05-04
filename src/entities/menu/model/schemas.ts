import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(["APPETIZER", "MAIN", "DESSERT", "DRINK"]),
  availability: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const menuItemCategorySchema = z.enum(["APPETIZER", "MAIN", "DESSERT", "DRINK"]);
export type MenuItemCategory = z.infer<typeof menuItemCategorySchema>;

export const menuItemSortSchema = z.enum(["NAME_ASC", "NAME_DESC", "PRICE_ASC", "PRICE_DESC"]);
export type MenuItemSort = z.infer<typeof menuItemSortSchema>; 