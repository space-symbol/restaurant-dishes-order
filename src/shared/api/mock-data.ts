import { z } from 'zod';
import { menuItemSchema, MenuItemCategory } from '@/entities/menu/model/schemas';
import { orderSchema, OrderStatus } from '@/entities/order/model/schemas';
import { reviewSchema } from '@/entities/review/model/schemas';

export type { MenuItemCategory, OrderStatus };

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: MenuItemCategory;
  timeToCook?: number;
  weight?: number;
  imageUrl?: string;
  updatedAt: string;
  createdAt: string;
  ingredientCollection?: {
    ingredients: Array<{
      name: string;
      quantity: string;
    }>;
  };
}

export interface Order {
  id: number;
  orderId: number;
  totalPrice: number;
  totalAmount: number;
  menuLineItems: Array<{
    menuItemName: string;
    price: number;
    quantity: number;
  }>;
  items: Array<{
    menuItemName: string;
    price: number;
    quantity: number;
  }>;
  address: {
    city: string;
    street: string;
    house: number;
    apartment?: number;
  };
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: number;
  menuId: number;
  createdBy: string;
  comment: string;
  rate: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Хинкали',
    description: 'Сочные хинкали со свининой/говядиной',
    price: 10.00,
    category: 'LUNCH',
    timeToCook: 20,
    weight: 150.55,
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'свинина', quantity: '20 г' },
        { name: 'говядина', quantity: '20 г' }
      ]
    }
  },
  {
    id: 2,
    name: 'Карбонара',
    description: 'Классическая итальянская паста с беконом, сливками и пармезаном',
    price: 12.99,
    category: 'PASTA',
    timeToCook: 15,
    weight: 250.00,
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'спагетти', quantity: '200 г' },
        { name: 'бекон', quantity: '100 г' },
        { name: 'сливки', quantity: '100 мл' },
        { name: 'пармезан', quantity: '50 г' }
      ]
    }
  },
  {
    id: 3,
    name: 'Цезарь с курицей',
    description: 'Свежий салат с куриным филе, хрустящими сухариками и соусом Цезарь',
    price: 8.99,
    category: 'SALAD',
    timeToCook: 10,
    weight: 200.00,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'куриное филе', quantity: '150 г' },
        { name: 'салат айсберг', quantity: '100 г' },
        { name: 'сухарики', quantity: '30 г' },
        { name: 'соус цезарь', quantity: '50 мл' }
      ]
    }
  },
  {
    id: 4,
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофе, маскарпоне и какао',
    price: 7.50,
    category: 'DESSERT',
    timeToCook: 5,
    weight: 150.00,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'маскарпоне', quantity: '200 г' },
        { name: 'кофе', quantity: '100 мл' },
        { name: 'какао', quantity: '20 г' }
      ]
    }
  },
  {
    id: 5,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из мраморной говядины с овощами гриль',
    price: 24.99,
    category: 'MEAT',
    timeToCook: 25,
    weight: 300.00,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'говядина рибай', quantity: '250 г' },
        { name: 'овощи гриль', quantity: '150 г' },
        { name: 'соус пеппер', quantity: '50 мл' }
      ]
    }
  },
  {
    id: 6,
    name: 'Мохито',
    description: 'Освежающий коктейль с белым ромом, лаймом и мятой',
    price: 6.99,
    category: 'DRINK',
    timeToCook: 5,
    weight: 300.00,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'белый ром', quantity: '50 мл' },
        { name: 'лайм', quantity: '1 шт' },
        { name: 'мята', quantity: '10 г' },
        { name: 'содовая', quantity: '100 мл' }
      ]
    }
  },
  {
    id: 7,
    name: 'Яичница с беконом',
    description: 'Сытный завтрак из яиц, хрустящего бекона и свежей зелени',
    price: 7.99,
    category: 'BREAKFAST',
    timeToCook: 10,
    weight: 250.00,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'яйца', quantity: '2 шт' },
        { name: 'бекон', quantity: '100 г' },
        { name: 'зелень', quantity: '10 г' },
        { name: 'хлеб', quantity: '2 ломтика' }
      ]
    }
  },
  {
    id: 8,
    name: 'Брускетта с томатами',
    description: 'Итальянская закуска с поджаренным хлебом, томатами и базиликом',
    price: 6.50,
    category: 'APPETIZER',
    timeToCook: 8,
    weight: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000&auto=format&fit=crop',
    updatedAt: '2023-05-15T12:00:00Z',
    createdAt: '2023-05-10T10:30:00Z',
    ingredientCollection: {
      ingredients: [
        { name: 'багет', quantity: '100 г' },
        { name: 'томаты', quantity: '50 г' },
        { name: 'базилик', quantity: '5 г' },
        { name: 'оливковое масло', quantity: '20 мл' }
      ]
    }
  }
];

export const mockOrders: Order[] = [
  {
    id: 1,
    orderId: 1,
    totalPrice: 944.80,
    totalAmount: 944.80,
    menuLineItems: [
      {
        menuItemName: 'Салат Цезарь',
        price: 15.50,
        quantity: 10
      },
      {
        menuItemName: 'Стейк из лосося',
        price: 25.99,
        quantity: 20
      },
      {
        menuItemName: 'Хинкали',
        price: 10.00,
        quantity: 30
      }
    ],
    items: [
      {
        menuItemName: 'Салат Цезарь',
        price: 15.50,
        quantity: 10
      },
      {
        menuItemName: 'Стейк из лосося',
        price: 25.99,
        quantity: 20
      },
      {
        menuItemName: 'Хинкали',
        price: 10.00,
        quantity: 30
      }
    ],
    address: {
      city: 'Moscow',
      street: 'Street',
      house: 1,
      apartment: 1
    },
    status: 'NEW',
    createdAt: '2023-05-23T19:21:33.490423'
  },
  {
    id: 2,
    orderId: 2,
    totalPrice: 45.97,
    totalAmount: 45.97,
    menuLineItems: [
      {
        menuItemName: 'Карбонара',
        price: 12.99,
        quantity: 2
      },
      {
        menuItemName: 'Мохито',
        price: 6.99,
        quantity: 1
      },
      {
        menuItemName: 'Тирамису',
        price: 7.50,
        quantity: 2
      }
    ],
    items: [
      {
        menuItemName: 'Карбонара',
        price: 12.99,
        quantity: 2
      },
      {
        menuItemName: 'Мохито',
        price: 6.99,
        quantity: 1
      },
      {
        menuItemName: 'Тирамису',
        price: 7.50,
        quantity: 2
      }
    ],
    address: {
      city: 'Moscow',
      street: 'Lenin Street',
      house: 15,
      apartment: 42
    },
    status: 'COMPLETED',
    createdAt: '2023-05-20T14:30:00.000Z'
  },
  {
    id: 3,
    orderId: 3,
    totalPrice: 32.98,
    totalAmount: 32.98,
    menuLineItems: [
      {
        menuItemName: 'Стейк Рибай',
        price: 24.99,
        quantity: 1
      },
      {
        menuItemName: 'Яичница с беконом',
        price: 7.99,
        quantity: 1
      }
    ],
    items: [
      {
        menuItemName: 'Стейк Рибай',
        price: 24.99,
        quantity: 1
      },
      {
        menuItemName: 'Яичница с беконом',
        price: 7.99,
        quantity: 1
      }
    ],
    address: {
      city: 'Moscow',
      street: 'Pushkin Street',
      house: 8,
      apartment: 12
    },
    status: 'PROCESSING',
    createdAt: '2023-05-22T09:15:00.000Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 1,
    menuId: 1,
    createdBy: 'user123',
    comment: 'Очень вкусно!',
    rate: 5,
    createdAt: '2023-05-15T12:00:00Z'
  },
  {
    id: 2,
    menuId: 1,
    createdBy: 'user456',
    comment: 'Отличное блюдо, рекомендую!',
    rate: 4,
    createdAt: '2023-05-16T14:30:00Z'
  },
  {
    id: 3,
    menuId: 2,
    createdBy: 'user789',
    comment: 'Неплохо, но могло бы быть лучше',
    rate: 3,
    createdAt: '2023-05-17T09:15:00Z'
  },
  {
    id: 4,
    menuId: 2,
    createdBy: 'user101',
    comment: 'Ужасно, не рекомендую',
    rate: 1,
    createdAt: '2023-05-18T16:45:00Z'
  },
  {
    id: 5,
    menuId: 3,
    createdBy: 'user202',
    comment: 'Просто отлично!',
    rate: 5,
    createdAt: '2023-05-19T11:20:00Z'
  },
  {
    id: 6,
    menuId: 3,
    createdBy: 'user303',
    comment: 'Хорошо, но порция маленькая',
    rate: 4,
    createdAt: '2023-05-20T13:10:00Z'
  },
  {
    id: 7,
    menuId: 4,
    createdBy: 'user404',
    comment: 'Средненько',
    rate: 2,
    createdAt: '2023-05-21T15:30:00Z'
  },
  {
    id: 8,
    menuId: 5,
    createdBy: 'user505',
    comment: 'Лучшее блюдо в ресторане!',
    rate: 5,
    createdAt: '2023-05-22T18:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'USER'
  }
];

export const mockTokens: Record<string, Tokens> = {
  'user1': {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token'
  }
}; 