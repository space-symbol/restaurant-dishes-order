import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { reviewSchema, reviewPaginationParamsSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

const responseSchema = z.array(reviewSchema);
type Response = z.infer<typeof responseSchema>;

export const getMenuItemReviews = createService(async (data: {
  menuItemId: string;
  params?: z.infer<typeof reviewPaginationParamsSchema>;
}) => {
  const validatedParams = data.params ? reviewPaginationParamsSchema.parse(data.params) : undefined;
  const response = await $api.get<Response>(`/v1/reviews/menu-items/${data.menuItemId}`, { 
    params: validatedParams 
  });
  return responseSchema.parse(response.data);
}); 