import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema, orderStatusSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

const updateOrderStatusSchema = z.object({
  orderId: z.string(),
  status: orderStatusSchema,
});

type UpdateOrderStatusData = z.infer<typeof updateOrderStatusSchema>;
type Response = z.infer<typeof orderSchema>;

export const updateOrderStatus = createService(async (data: UpdateOrderStatusData) => {
  const validatedData = updateOrderStatusSchema.parse(data);
  const response = await $api.patch<Response>(`/v1/menu-orders/${validatedData.orderId}/status`, {
    status: validatedData.status,
  });
  return orderSchema.parse(response.data);
}); 