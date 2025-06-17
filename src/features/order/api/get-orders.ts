import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

const paramsSchema = z.object({
  sort: z.enum(["DATE_ASC", "DATE_DESC"]).optional(),
  from: z.number().optional(),
  size: z.number().optional(),
});

const responseSchema = z.object({
  orders: z.array(orderSchema),
});

type Response = z.infer<typeof responseSchema>;

export const getOrders = createService(async (params?: z.infer<typeof paramsSchema>) => {
  const validatedParams = params ? paramsSchema.parse(params) : undefined;
  const response = await $api.get("/v1/menu-orders", { params: validatedParams });
  return responseSchema.parse(response.data);
}); 