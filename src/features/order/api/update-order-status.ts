import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

const updateOrderStatusSchema = z.object({
  orderId: z.number(),
  status: z.enum(["NEW", "PROCESSING", "COMPLETED", "CANCELLED"])
});

type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;
type Response = z.infer<typeof orderSchema>;

export const updateOrderStatus = createService<UpdateOrderStatus, Response>(async (data) => {
  const validatedData = updateOrderStatusSchema.parse(data);
  const response = await $api.patch(`/v1/menu-orders/${validatedData.orderId}/status`, {
    status: validatedData.status
  });
  return orderSchema.parse(response.data);
}); 