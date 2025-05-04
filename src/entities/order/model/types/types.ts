export interface Order {
  id: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface CreateOrderData {
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
  name: string;
  phone: string;
  pickupOptionId: string;
  [key: string]: any; // Allow additional fields based on pickup option
} 