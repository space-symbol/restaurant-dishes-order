import { z } from "zod";

export const orderLineItemSchema = z.object({
  menuItemName: z.string(),
  price: z.number(),
  quantity: z.number()
});

export const addressSchema = z.object({
  city: z.string(),
  street: z.string(),
  house: z.number(),
  apartment: z.number().optional()
});

export const orderSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  totalPrice: z.number(),
  totalAmount: z.number(),
  items: z.array(orderLineItemSchema),
  menuLineItems: z.array(orderLineItemSchema),
  address: addressSchema,
  status: z.enum(['NEW', 'PROCESSING', 'COMPLETED', 'CANCELLED']),
  createdAt: z.string()
});

export const createOrderSchema = z.object({
  nameToQuantity: z.record(z.string(), z.number()),
  address: addressSchema
});

export type Order = z.infer<typeof orderSchema>;
export type OrderLineItem = z.infer<typeof orderLineItemSchema>;
export type Address = z.infer<typeof addressSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type CreateOrderData = CreateOrder;

export const orderStatusSchema = z.enum(["NEW", "PROCESSING", "COMPLETED", "CANCELLED"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>; 