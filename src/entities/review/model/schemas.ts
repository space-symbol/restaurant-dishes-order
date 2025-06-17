import { z } from "zod";

export const reviewSchema = z.object({
  id: z.number(),
  menuId: z.number(),
  createdBy: z.string(),
  comment: z.string(),
  rate: z.number().min(1).max(5),
  createdAt: z.string()
});

export const reviewPaginationParamsSchema = z.object({
  from: z.number().optional(),
  size: z.number().optional(),
  sortBy: z.enum(['date_asc', 'date_desc', 'rate_asc', 'rate_desc']).optional()
});

export const menuRatingSchema = z.object({
  menuId: z.number(),
  averageRating: z.number(),
  totalRatings: z.number()
});

export const reviewRatingSchema = z.object({
  menuId: z.number(),
  averageRating: z.number(),
  totalRatings: z.number()
});

export const ratedReviewsResponseSchema = z.object({
  reviews: z.array(reviewSchema),
  menuRating: menuRatingSchema
});

export const ratingsResponseSchema = z.object({
  menuRatings: z.array(menuRatingSchema)
});

export type Review = z.infer<typeof reviewSchema>;
export type ReviewPaginationParams = z.infer<typeof reviewPaginationParamsSchema>;
export type MenuRating = z.infer<typeof menuRatingSchema>;
export type RatedReviewsResponse = z.infer<typeof ratedReviewsResponseSchema>;
export type RatingsResponse = z.infer<typeof ratingsResponseSchema>;
export type ReviewSort = z.infer<typeof reviewPaginationParamsSchema>['sortBy']; 