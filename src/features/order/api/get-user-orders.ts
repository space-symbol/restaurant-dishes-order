import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { orderSchema } from "@/entities/order/model/schemas";
import { z } from "zod";

const paramsSchema = z.object({
  userName: z.string(),
  sort: z.enum(["DATE_ASC", "DATE_DESC"]).optional(),
  from: z.number().optional(),
  size: z.number().optional()
});

const responseSchema = z.object({
  items: z.array(orderSchema),
  total: z.number()
});

type Params = z.infer<typeof paramsSchema>;
type Response = z.infer<typeof responseSchema>;

export const getUserOrders = createService<Params, Response>(async (params) => {
  const validatedParams = paramsSchema.parse(params);
  const { userName, ...queryParams } = validatedParams;
  
  const response = await $api.get("/v1/menu-orders", {
    params: queryParams,
    headers: {
      "X-User-Name": userName
    }
  });
  return responseSchema.parse(response.data);
}); 