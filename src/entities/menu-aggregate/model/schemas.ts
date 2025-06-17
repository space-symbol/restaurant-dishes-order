import { z } from 'zod';
import { menuItemSchema } from '@/entities/menu/model/schemas';
import { reviewSchema, menuRatingSchema } from '@/entities/review/model/schemas';

export const ratedMenuItemSchema = menuItemSchema.extend({
  wilsonScore: z.number(),
  avgStars: z.number(),
  featured: z.boolean().optional()
});

export const menuAggregateSchema = z.object({
  menuItem: menuItemSchema,
  reviews: z.array(reviewSchema),
  ratingInfo: menuRatingSchema
});

export const menuAggregateListSchema = z.array(ratedMenuItemSchema);

export const menuItemWithReviewsSchema = z.object({
  menuItem: menuItemSchema,
  reviews: z.array(reviewSchema),
  ratingInfo: menuRatingSchema
});

export type RatedMenuItem = z.infer<typeof ratedMenuItemSchema>;
export type MenuAggregate = z.infer<typeof menuAggregateSchema>;
export type MenuAggregateList = z.infer<typeof menuAggregateListSchema>;
export type MenuItemWithReviews = z.infer<typeof menuItemWithReviewsSchema>; 