import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { reviewSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

const createReviewSchema = z.object({
  menuId: z.number(),
  rate: z.number().min(1).max(5),
  comment: z.string().optional(),
});

type CreateReviewData = z.infer<typeof createReviewSchema>;

export const createReview = createService(async (data: CreateReviewData) => {
  const validatedData = createReviewSchema.parse(data);
  const response = await $api.post("/v1/reviews", validatedData);
  return reviewSchema.parse(response.data);
}); 