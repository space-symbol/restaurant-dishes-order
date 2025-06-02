import { mockMenuItems, mockOrders, mockReviews, mockUsers, mockTokens, OrderStatus, User } from './mock-data';
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { ACCESS_TOKEN_KEY } from "@/features/auth/lib/consts/local-storage";

const DEFAULT_PAGE_SIZE = 9;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type ApiInstance = {
  get: (url: string, config?: { params?: any }) => Promise<{ data: any }>;
  post: (url: string, data?: any) => Promise<{ data: any }>;
  put: (url: string, data?: any) => Promise<{ data: any }>;
  delete: (url: string, data?: any) => Promise<{ data: any }>;
};

export const mockApi: ApiInstance = {
  get: async (url: string, config?: { params?: any }) => {
    await delay(300); 
    const params = config?.params;

    
    if (url === '/user/me') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        throw new Error('Unauthorized');
      }
      const userId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      if (!userId) throw new Error('Invalid token');
      const user = mockUsers.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      const { password, ...userWithoutPassword } = user;
      return { data: userWithoutPassword };
    }

    
    if (url === '/admin/users') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        throw new Error('Unauthorized');
      }
      const userId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      if (!userId) throw new Error('Invalid token');
      const user = mockUsers.find(u => u.id === userId);
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Forbidden');
      }
      const usersWithoutPasswords = mockUsers.map(({ password, ...u }) => u);
      return { data: usersWithoutPasswords };
    }

    
    if (url === '/admin/reviews') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        throw new Error('Unauthorized');
      }
      const userId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      if (!userId) throw new Error('Invalid token');
      const user = mockUsers.find(u => u.id === userId);
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Forbidden');
      }

      let reviews = [...mockReviews];

      
      if (params?.sort === 'DATE_DESC') {
        reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (params?.sort === 'DATE_ASC') {
        reviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (params?.sort === 'RATING_DESC') {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (params?.sort === 'RATING_ASC') {
        reviews.sort((a, b) => a.rating - b.rating);
      }

      
      const from = params?.from || 0;
      const size = params?.size || 10;

      return {
        data: reviews.slice(from, from + size)
      };
    }

    
    if (url === '/v1/menu-items') {
      let items = [...mockMenuItems];

      if (params?.category && params.category !== 'ALL') {
        items = items.filter(item => item.category === params.category);
      }

      
      if (params?.sort) {
        switch (params.sort) {
          case 'PRICE_ASC':
            items.sort((a, b) => a.price - b.price);
            break;
          case 'PRICE_DESC':
            items.sort((a, b) => b.price - a.price);
            break;
          case 'NAME_ASC':
            items.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'NAME_DESC':
            items.sort((a, b) => b.name.localeCompare(a.name));
            break;
        }
      }

      
      const from = params?.from || 0;
      const size = params?.size || DEFAULT_PAGE_SIZE;

      
      const itemsWithRequiredFields = items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        availability: item.availability,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
        imageUrl: item.imageUrl
      }));

      return {
        data: {
          items: itemsWithRequiredFields.slice(from, from + size),
          total: items.length,
          from,
          size
        }
      };
    }

    
    if (url === '/v1/reviews/my') {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Unauthorized');
      }
      const userId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      if (!userId) throw new Error('Invalid token');
      const user = mockUsers.find(u => u.id === userId);
      if (!user) {
        throw new Error('Unauthorized');
      }
      let reviews = mockReviews.filter(review => review.userId === user.id);

      
      if (params?.sort === 'DATE_DESC') {
        reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (params?.sort === 'DATE_ASC') {
        reviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (params?.sort === 'RATING_DESC') {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (params?.sort === 'RATING_ASC') {
        reviews.sort((a, b) => a.rating - b.rating);
      }

      
      const from = params?.from || 0;
      const size = params?.size || 10;

      return {
        data: reviews.slice(from, from + size)
      };
    }

    if (url.startsWith('/v1/menu-items/')) {
      const id = url.split('/').pop();
      const item = mockMenuItems.find(item => item.id === id);
      if (!item) throw new Error('Menu item not found');
      return { data: item };
    }

    if (url === '/v1/orders') {
      let filteredOrders = [...mockOrders];
      
      if (params?.sort) {
        filteredOrders.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return params.sort === 'DATE_ASC' ? dateA - dateB : dateB - dateA;
        });
      }
      return {
        data: {
          orders: filteredOrders,
          total: filteredOrders.length
        }
      };
    }

    if (url.startsWith('/v1/reviews/')) {
      const id = url.split('/').pop();
      const review = mockReviews.find(review => review.id === id);
      if (!review) throw new Error('Review not found');
      return { data: review };
    }

    if (url === '/v1/menu-aggregate') {
      let filteredItems = [...mockMenuItems];
      
      if (params?.category) {
        filteredItems = filteredItems.filter(item => item.category === params.category);
      }
      
      if (params?.sort) {
        filteredItems.sort((a, b) => {
          switch (params.sort) {
            case 'RATE_ASC':
              return a.rating.averageRating - b.rating.averageRating;
            case 'RATE_DESC':
              return b.rating.averageRating - a.rating.averageRating;
            default:
              return 0;
          }
        });
      }

      return {
        data: {
          items: filteredItems,
          total: filteredItems.length
        }
      };
    }

    throw new Error('Not found');
  },

  post: async (url: string, data: any) => {
    await delay(300);

    
    if (url === '/v1/menu-items') {
      const newItem = {
        id: String(mockMenuItems.length + 1),
        ...data,
        availability: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: {
          averageRating: 0,
          totalReviews: 0,
          menuItemId: String(mockMenuItems.length + 1)
        }
      };
      mockMenuItems.push(newItem);
      return { data: newItem };
    }

    if (url === '/auth/registration') {
      const { email, password, name } = data;
      
      if (mockUsers.some(user => user.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        email,
        password,
        name,
        role: 'USER'
      };

      mockUsers.push(newUser);
      
      return { data: { message: 'Регистрация прошла успешно' } };
    }

    if (url === '/auth/login') {
      const { email, password } = data;
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Неверные логин или пароль');

      const tokens = mockTokens[user.id];
      if (!tokens) throw new Error('Token generation failed');

      const { password: _, ...userWithoutPassword } = user;
      return { 
        data: {
          accessToken: tokens.accessToken,
          user: userWithoutPassword
        }
      };
    }

    if (url === '/auth/refresh') {
      const { refreshToken } = data;
      
      const userId = Object.entries(mockTokens).find(([_, tokens]) => tokens.refreshToken === refreshToken)?.[0];
      if (!userId) throw new Error('Invalid refresh token');

      const tokens = mockTokens[userId];
      return { data: tokens };
    }

    if (url === '/v1/orders') {
      const newOrder = {
        id: String(mockOrders.length + 1),
        ...data,
        status: 'PENDING' as OrderStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockOrders.push(newOrder);
      return { data: newOrder };
    }

    if (url === '/v1/reviews') {
      const newReview = {
        id: String(mockReviews.length + 1),
        ...data,
        userId: mockUsers[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockReviews.push(newReview);
      return { data: newReview };
    }

    throw new Error('Not found');
  },

  put: async (url: string, data: any) => {
    await delay(300);

    
    if (url.startsWith('/v1/menu-items/')) {
      const id = url.split('/').pop();
      const index = mockMenuItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Menu item not found');
      }
      mockMenuItems[index] = { ...mockMenuItems[index], ...data };
      return { data: mockMenuItems[index] };
    }

    if (url.startsWith('/admin/users/')) {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');
      
      const adminId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      const admin = mockUsers.find(u => u.id === adminId);
      
      if (!admin || admin.role !== 'ADMIN') throw new Error('Forbidden');

      const userId = url.split('/').pop();
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) throw new Error('User not found');
      
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...data,
      };
      
      const { password, ...userWithoutPassword } = mockUsers[userIndex];
      return { data: userWithoutPassword };
    }

    if (url.startsWith('/v1/orders/')) {
      const orderId = url.split('/').pop();
      const orderIndex = mockOrders.findIndex(order => order.id === orderId);
      if (orderIndex === -1) throw new Error('Order not found');
      
      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      return { data: mockOrders[orderIndex] };
    }

    if (url.startsWith('/v1/reviews/')) {
      const reviewId = url.split('/').pop();
      const reviewIndex = mockReviews.findIndex(review => review.id === reviewId);
      if (reviewIndex === -1) throw new Error('Review not found');
      
      mockReviews[reviewIndex] = {
        ...mockReviews[reviewIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      return { data: mockReviews[reviewIndex] };
    }

    throw new Error('Not found');
  },

  delete: async (url: string, data: any) => {
    await delay(300);

    
    if (url.startsWith('/v1/menu-items/')) {
      const id = url.split('/').pop();
      const index = mockMenuItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Menu item not found');
      }
      mockMenuItems.splice(index, 1);
      return { data: null };
    }

    if (url.startsWith('/admin/users/')) {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');
      
      const adminId = Object.entries(mockTokens).find(([_, tokens]) => tokens.accessToken === token)?.[0];
      const admin = mockUsers.find(u => u.id === adminId);
      
      if (!admin || admin.role !== 'ADMIN') throw new Error('Forbidden');

      const userId = url.split('/').pop();
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) throw new Error('User not found');
      
      mockUsers.splice(userIndex, 1);
      return { data: null };
    }

    throw new Error('Not found');
  }
}; 

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  rating: {
    averageRating: number;
    totalReviews: number;
    menuItemId: string;
  };
}

interface Review {
  id: string;
  reviewId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface MenuItemsResponse {
  items: MenuItem[];
  total: number;
}

interface MenuItemsParams {
  category?: string;
  sort?: 'PRICE_ASC' | 'PRICE_DESC' | 'NAME_ASC' | 'NAME_DESC';
  from?: number;
  size?: number;
}

interface ReviewsParams {
  sort?: 'DATE_DESC' | 'DATE_ASC' | 'RATING_DESC' | 'RATING_ASC';
  from?: number;
  size?: number;
}

interface CreateMenuItemDto {
  name: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
} 