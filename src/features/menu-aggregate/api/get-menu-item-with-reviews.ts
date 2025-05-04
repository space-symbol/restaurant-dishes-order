import { $api } from "@/shared/api/instance";
import { MenuItemWithReviews } from "@/entities/menu-aggregate/model/types/types";
import { createService } from "@/shared/lib/create-service";
import { ReviewSort } from "@/entities/review/model/types/types";
import { z } from "zod";

const responseSchema = z.object({
    menuId: z.string(),
    name: z.string(),
    price: z.number(),
    availability: z.boolean(),
    reviews: z.array(z.object({
        reviewId: z.string(),
        rating: z.number(),
        comment: z.string(),
        createdAt: z.string(),
    })),
});

type Response = z.infer<typeof responseSchema>;

export const getMenuItemWithReviews = createService(async (data: {
  menuId: string;
  params?: {
    sort?: ReviewSort;
    from?: number;
    size?: number;
  };
}) => {
  const response = await $api.get<Response>(`/v1/menu-aggregate/${data.menuId}`, { 
    params: data.params 
  });

  const parsedResponse = responseSchema.parse(response.data);
  console.log(parsedResponse);

  return parsedResponse;
}); 