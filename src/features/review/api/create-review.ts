import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { reviewSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

const createReviewSchema = z.object({
  menuItemId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
});

type CreateReview = z.infer<typeof createReviewSchema>;
type Response = z.infer<typeof reviewSchema>;

export const createReview = createService(async (data: CreateReview) => {
  const validatedData = createReviewSchema.parse(data);
  const response = await $api.post<Response>("/v1/reviews", validatedData);
  return reviewSchema.parse(response.data);
}); 