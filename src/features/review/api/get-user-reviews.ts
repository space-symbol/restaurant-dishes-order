import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { reviewSchema, reviewPaginationParamsSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

const responseSchema = z.array(reviewSchema);
type Response = z.infer<typeof responseSchema>;

export const getUserReviews = createService(async (params?: z.infer<typeof reviewPaginationParamsSchema>) => {
  const validatedParams = params ? reviewPaginationParamsSchema.parse(params) : undefined;
  const response = await $api.get<Response>("/v1/reviews/my", { params: validatedParams });
  return responseSchema.parse(response.data);
}); 