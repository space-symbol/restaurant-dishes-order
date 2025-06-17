import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string()
});

export const ingredientCollectionSchema = z.object({
  ingredients: z.array(ingredientSchema)
});

export const menuItemCategorySchema = z.enum(["PASTA", "MEAT", "SALAD", "DESSERT", "DRINK", "BREAKFAST", "LUNCH", "APPETIZER"]);

export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: menuItemCategorySchema,
  timeToCook: z.number().optional(),
  weight: z.number().optional(),
  imageUrl: z.string().optional(),
  availability: z.boolean().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  ingredientCollection: ingredientCollectionSchema.optional()
});

export const createMenuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: menuItemCategorySchema,
  timeToCook: z.number().optional(),
  weight: z.number().optional(),
  imageUrl: z.string().optional(),
  availability: z.boolean().optional(),
  ingredientCollection: ingredientCollectionSchema.optional()
});

export const menuItemWithRatingSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: menuItemCategorySchema,
  timeToCook: z.number().optional(),
  weight: z.number().optional(),
  imageUrl: z.string().optional(),
  availability: z.boolean().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  ingredientCollection: ingredientCollectionSchema.optional(),
  avgStars: z.number(),
  reviewCount: z.number(),
  wilsonScore: z.number(),
  featured: z.boolean().optional()
});

export const menuItemsResponseSchema = z.array(menuItemSchema);

export type MenuItem = z.infer<typeof menuItemSchema>;
export type MenuItemsResponse = z.infer<typeof menuItemsResponseSchema>;
export type CreateMenuItemDto = z.infer<typeof createMenuItemSchema>;
export type MenuItemWithRating = z.infer<typeof menuItemWithRatingSchema>;

export type MenuItemCategory = z.infer<typeof menuItemCategorySchema>;

export const menuItemSortSchema = z.enum([
  "AZ", "ZA", 
  "PRICE_ASC", "PRICE_DESC", 
  "DATE_ASC", "DATE_DESC",
  "RATE_ASC", "RATE_DESC"
]);
export type MenuItemSort = z.infer<typeof menuItemSortSchema>; 