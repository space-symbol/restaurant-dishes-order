import { $api } from "@/shared/api/instance";
import { MenuItemWithReviews } from "@/entities/menu-aggregate";
import { createService } from "@/shared/api/create-service";
import { ReviewSort } from "@/entities/review";
import { z } from "zod";

const responseSchema = z.object({
  menuItem: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.enum(['APPETIZER', 'MAIN', 'DESSERT', 'DRINK', 'LUNCH', 'BREAKFAST']),
    imageUrl: z.string().optional(),
    timeToCook: z.number().optional(),
    weight: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  reviews: z.array(z.object({
    id: z.number(),
    menuId: z.number(),
    createdBy: z.string(),
    comment: z.string(),
    rate: z.number(),
    createdAt: z.string()
  })),
  ratingInfo: z.object({
    menuId: z.number(),
    averageRating: z.number(),
    totalRatings: z.number()
  })
});

type Response = z.infer<typeof responseSchema>;

export const getMenuItemWithReviews = createService<{ menuId: number; sortBy?: ReviewSort }, Response>(async (data) => {
  const response = await $api.get(`/v1/menu-aggregate/${data.menuId}`, {
    params: data.sortBy ? { sortBy: data.sortBy } : undefined
  });
  return responseSchema.parse(response.data);
}); 