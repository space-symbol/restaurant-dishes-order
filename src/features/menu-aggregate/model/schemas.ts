import { z } from "zod";
import { menuItemSchema } from "@/entities/menu";
import { reviewSchema, reviewRatingSchema } from "@/entities/review";

export const menuItemWithReviewsSchema = z.object({
  menuId: z.string(),
  name: z.string(),
  price: z.number(),
  availability: z.boolean(),
  reviews: z.array(reviewSchema),
});

export type MenuItemWithReviews = z.infer<typeof menuItemWithReviewsSchema>;

export const menuItemWithRatingSchema = z.object({
  ...menuItemSchema.shape,
  rating: reviewRatingSchema,
});

export type MenuItemWithRating = z.infer<typeof menuItemWithRatingSchema>; 