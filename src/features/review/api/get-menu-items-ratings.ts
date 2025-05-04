import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { reviewRatingSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

const requestSchema = z.object({
  menuItemIds: z.array(z.string()),
});

const responseSchema = z.array(reviewRatingSchema);
type Response = z.infer<typeof responseSchema>;

export const getMenuItemsRatings = createService(async (menuItemIds: string[]) => {
  const validatedData = requestSchema.parse({ menuItemIds });
  const response = await $api.post<Response>("/v1/reviews/ratings", validatedData);
  return responseSchema.parse(response.data);
}); 