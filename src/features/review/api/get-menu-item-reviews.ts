import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { ratedReviewsResponseSchema, RatedReviewsResponse } from "@/entities/review/model/schemas";
import { z } from "zod";

const paramsSchema = z.object({
  from: z.number().optional(),
  size: z.number().optional(),
  sortBy: z.enum(["date_asc", "date_desc", "rate_asc", "rate_desc"]).optional()
});

export const getMenuItemReviews = createService<{ menuId: number; params?: z.infer<typeof paramsSchema> }, RatedReviewsResponse>(async ({ menuId, params }) => {
  const validatedParams = params ? paramsSchema.parse(params) : undefined;
  const response = await $api.get(`/v1/reviews/menu-item/${menuId}`, { 
    params: validatedParams
  });
  return ratedReviewsResponseSchema.parse(response.data);
}); 