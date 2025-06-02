import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string; // В реальном приложении пароли должны быть хешированы
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const mockMenuItems = [
  {
    id: "1",
    name: "Цезарь с курицей",
    description: "Свежий салат с куриной грудкой, хрустящими сухариками и соусом Цезарь",
    category: "APPETIZER",
    price: 450,
    availability: true,
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: {
      averageRating: 4.5,
      totalReviews: 128,
      menuItemId: "1"
    }
  },
  {
    id: "2",
    name: "Стейк Рибай",
    description: "Сочный стейк из мраморной говядины с овощами гриль",
    category: "MAIN",
    price: 2500,
    availability: true,
    imageUrl: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlYWt8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: {
      averageRating: 4.8,
      totalReviews: 256,
      menuItemId: "2"
    }
  },
  {
    id: "3",
    name: "Тирамису",
    description: "Классический итальянский десерт с кофе и маскарпоне",
    category: "DESSERT",
    price: 350,
    availability: true,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: {
      averageRating: 4.7,
      totalReviews: 189,
      menuItemId: "3"
    }
  },
  {
    id: "4",
    name: "Мохито",
    description: "Освежающий коктейль с мятой и лаймом",
    category: "DRINK",
    price: 400,
    availability: true,
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9qaXRvfGVufDB8fDB8fHww",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: {
      averageRating: 4.6,
      totalReviews: 156,
      menuItemId: "4"
    }
  }
];

export const mockOrders = [
  {
    id: "1",
    items: [
      { menuItemId: "1", quantity: 2 },
      { menuItemId: "2", quantity: 1 },
    ],
    status: "PENDING" as OrderStatus,
    totalAmount: 50.97,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    items: [
      { menuItemId: "3", quantity: 1 },
    ],
    status: "COMPLETED" as OrderStatus,
    totalAmount: 8.99,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockReviews = [
  {
    id: "1",
    reviewId: "1",
    userId: "user1",
    userName: "Иван Иванов",
    rating: 5,
    comment: "Отличный ресторан! Блюда очень вкусные, обслуживание на высшем уровне.",
    createdAt: "2024-03-15T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z"
  },
  {
    id: "2",
    reviewId: "2",
    userId: "user2",
    userName: "Петр Петров",
    rating: 4,
    comment: "Хороший ресторан, но цены немного завышены. Еда вкусная.",
    createdAt: "2024-03-14T15:30:00Z",
    updatedAt: "2024-03-14T15:30:00Z"
  },
  {
    id: "3",
    reviewId: "3",
    userId: "user3",
    userName: "Анна Сидорова",
    rating: 5,
    comment: "Прекрасное место! Особенно понравился стейк и десерты.",
    createdAt: "2024-03-13T18:45:00Z",
    updatedAt: "2024-03-13T18:45:00Z"
  }
];

export const mockUsers: User[] = [
  {
    id: "user1",
    email: "user@example.com",
    name: "Иван Иванов",
    role: "USER",
    password: "password123"
  },
  {
    id: "user2",
    email: "petr@example.com",
    name: "Петр Петров",
    role: "USER",
    password: "password123"
  },
  {
    id: "user3",
    email: "anna@example.com",
    name: "Анна Сидорова",
    role: "USER",
    password: "password123"
  },
  {
    id: "user4",
    email: "maria@example.com",
    name: "Мария Кузнецова",
    role: "USER",
    password: "password123"
  },
  {
    id: "admin1",
    email: "admin@example.com",
    name: "Администратор",
    role: "ADMIN",
    password: "admin123"
  },
  {
    id: "admin2",
    email: "superadmin@example.com",
    name: "Главный администратор",
    role: "ADMIN",
    password: "admin123"
  }
];

export const mockTokens: Record<string, Tokens> = {
  "user1": {
    accessToken: "mock-access-token-user1",
    refreshToken: "mock-refresh-token-user1"
  },
  "user2": {
    accessToken: "mock-access-token-user2",
    refreshToken: "mock-refresh-token-user2"
  },
  "user3": {
    accessToken: "mock-access-token-user3",
    refreshToken: "mock-refresh-token-user3"
  },
  "user4": {
    accessToken: "mock-access-token-user4",
    refreshToken: "mock-refresh-token-user4"
  },
  "admin1": {
    accessToken: "mock-access-token-admin1",
    refreshToken: "mock-refresh-token-admin1"
  },
  "admin2": {
    accessToken: "mock-access-token-admin2",
    refreshToken: "mock-refresh-token-admin2"
  }
}; 