import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { reviewSchema } from "@/entities/review/model/schemas";
import { z } from "zod";

type Response = z.infer<typeof reviewSchema>;

export const getReview = createService(async (id: string) => {
  const response = await $api.get<Response>(`/v1/reviews/${id}`);
  return reviewSchema.parse(response.data);
}); 