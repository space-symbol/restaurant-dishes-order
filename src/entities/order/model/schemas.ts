import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().min(1),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  items: z.array(orderItemSchema),
  totalAmount: z.number(),
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

export const orderStatusSchema = z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema),
  name: z.string().min(1),
  phone: z.string().min(1),
});

export type CreateOrder = z.infer<typeof createOrderSchema>; 