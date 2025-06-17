import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

const createOrderSchema = z.object({
  nameToQuantity: z.record(z.string(), z.number()),
  address: z.object({
    city: z.string(),
    street: z.string(),
    house: z.number(),
    apartment: z.number().optional()
  })
});

type CreateOrder = z.infer<typeof createOrderSchema>;
type Response = z.infer<typeof orderSchema>;

export const createOrder = createService<CreateOrder, Response>(async (data) => {
  const validatedData = createOrderSchema.parse(data);
  const response = await $api.post("/v1/menu-orders", validatedData);
  return orderSchema.parse(response.data);
}); 