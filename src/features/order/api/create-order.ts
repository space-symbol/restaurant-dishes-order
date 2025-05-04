import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema, createOrderSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

type CreateOrder = z.infer<typeof createOrderSchema>;
type Response = z.infer<typeof orderSchema>;

export const createOrder = createService(async (data: CreateOrder) => {
  const validatedData = createOrderSchema.parse(data);
  const response = await $api.post<Response>("/v1/menu-orders", validatedData);
  return orderSchema.parse(response.data);
}); 