import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { ratingsResponseSchema, RatingsResponse } from "@/entities/review/model/schemas";
import { z } from "zod";

const requestSchema = z.object({
  menuIds: z.array(z.number())
});

export const getMenuItemsRatings = createService<number[], RatingsResponse>(async (menuIds) => {
  const validatedData = requestSchema.parse({ menuIds });
  const response = await $api.post("/v1/reviews/ratings", validatedData);
  return ratingsResponseSchema.parse(response.data);
}); 