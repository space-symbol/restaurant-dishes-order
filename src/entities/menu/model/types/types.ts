import { reviewRatingSchema } from "@/entities/review";
import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(["APPETIZER", "MAIN", "DESSERT", "DRINK"]),
  availability: z.boolean(),
  imageUrl: z.string().optional(),
  featured: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const menuItemWithRatingSchema = menuItemSchema.extend({
  rating: reviewRatingSchema,
});

export type MenuItemWithRating = z.infer<typeof menuItemWithRatingSchema>;

export type MenuItemSort = 'NAME_ASC' | 'NAME_DESC' | 'PRICE_ASC' | 'PRICE_DESC' | 'RATING_ASC' | 'RATING_DESC';

export type MenuItemCategory = 'APPETIZER' | 'MAIN' | 'DESSERT' | 'DRINK';