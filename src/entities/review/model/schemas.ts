import { z } from "zod";

export const reviewSchema = z.object({
  reviewId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewSortSchema = z.enum(["DATE_ASC", "DATE_DESC", "RATING_ASC", "RATING_DESC"]);
export type ReviewSort = z.infer<typeof reviewSortSchema>;

export const reviewPaginationParamsSchema = z.object({
  sort: reviewSortSchema.optional(),
  from: z.number().optional(),
  size: z.number().optional(),
});

export type ReviewPaginationParams = z.infer<typeof reviewPaginationParamsSchema>;

export const reviewRatingSchema = z.object({
  menuItemId: z.string(),
  averageRating: z.number(),
  totalReviews: z.number(),
});

export type ReviewRating = z.infer<typeof reviewRatingSchema>; 