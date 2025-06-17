import { mockMenuItems, mockOrders, mockReviews, mockUsers, mockTokens, OrderStatus, User } from './mock-data';
import { MenuItemCategory } from '@/entities/menu/model/schemas';
import { ACCESS_TOKEN_KEY } from "@/features/auth/lib/consts/local-storage";

const DEFAULT_PAGE_SIZE = 9;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type ApiInstance = {
  get: (url: string, config?: { params?: any; headers?: any }) => Promise<{ data: any }>;
  post: (url: string, data?: any, config?: { headers?: any }) => Promise<{ data: any }>;
  patch: (url: string, data?: any, config?: { headers?: any }) => Promise<{ data: any }>;
  delete: (url: string, config?: { headers?: any }) => Promise<{ data: any }>;
};

export const mockApi: ApiInstance = {
  get: async (url: string, { params, headers }: { params?: Record<string, any>; headers?: Record<string, any> } = {}) => {
    console.log('Mock API GET request:', { url, params, headers });
    await delay(300);

    if ((url.startsWith('/v1/menu-items/') || url.startsWith('/menu-items/')) && !url.includes('?')) {
      const id = parseInt(url.split('/').pop() || '0');
      console.log('Mock API: Looking for menu item with id:', id);
      const menuItem = mockMenuItems.find(item => item.id === id);
      console.log('Mock API: Found menu item:', menuItem);
      if (!menuItem) {
        throw new Error('Menu item not found');
      }
      return { data: menuItem };
    }

    if (url.startsWith('/v1/menu-items') || url.startsWith('/menu-items')) {
      let filteredItems = [...mockMenuItems];

      if (params?.category) {
        filteredItems = filteredItems.filter(item => item.category === params.category);
      }

      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.name.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
        );
      }

      if (params?.sort) {
        switch (params.sort) {
          case 'AZ':
            filteredItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'ZA':
            filteredItems.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'PRICE_ASC':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
          case 'PRICE_DESC':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
          case 'DATE_ASC':
            filteredItems.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'DATE_DESC':
            filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }
      }

      const from = params?.from ? parseInt(params.from) : 0;
      const size = params?.size ? parseInt(params.size) : 10;
      const paginatedItems = filteredItems.slice(from, from + size);

      return {
        data: paginatedItems
      };
    }

    if (url.startsWith('/v1/reviews/menu-item/') || url.startsWith('/reviews/menu-item/')) {
      const menuId = parseInt(url.split('/').pop() || '0');
      const reviews = mockReviews.filter(review => review.menuId === menuId);
      
      if (params?.sortBy) {
        switch (params.sortBy) {
          case 'date_desc':
            reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'date_asc':
            reviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'rate_desc':
            reviews.sort((a, b) => b.rate - a.rate);
            break;
          case 'rate_asc':
            reviews.sort((a, b) => a.rate - b.rate);
            break;
        }
      }

      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length
        : 0;

      return {
        data: {
          reviews,
          menuRating: {
            menuId,
            averageRating,
            totalRatings: reviews.length
          }
        }
      };
    }

    if (url === '/admin/reviews' || url === '/v1/admin/reviews') {
      let filteredReviews = [...mockReviews];
      
      console.log('Admin reviews params:', params);
      console.log('Original reviews count:', filteredReviews.length);

      if (params?.sortBy) {
        console.log('Sorting by:', params.sortBy);
        switch (params.sortBy) {
          case 'date_desc':
            filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'date_asc':
            filteredReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'rate_desc':
            filteredReviews.sort((a, b) => b.rate - a.rate);
            break;
          case 'rate_asc':
            filteredReviews.sort((a, b) => a.rate - b.rate);
            break;
        }
        console.log('Sorted reviews:', filteredReviews.map(r => ({ id: r.id, rate: r.rate, date: r.createdAt })));
      }

      const from = params?.from ? parseInt(params.from) : 0;
      const size = params?.size ? parseInt(params.size) : 10;
      const paginatedReviews = filteredReviews.slice(from, from + size);

      console.log('Returning reviews:', paginatedReviews.length);

      return {
        data: paginatedReviews
      };
    }

    if (url === '/v1/menu-orders' || url === '/menu-orders') {
      let filteredOrders = [...mockOrders];

      const userName = headers?.['X-User-Name'];
      if (userName) {
        console.log(`Filtering orders for user: ${userName}`);
      }

      if (params?.status) {
        filteredOrders = filteredOrders.filter(order => order.status === params.status);
      }

      if (params?.fromDate && params?.toDate) {
        const fromDate = new Date(params.fromDate);
        const toDate = new Date(params.toDate);
        filteredOrders = filteredOrders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= fromDate && orderDate <= toDate;
        });
      }

      if (params?.sort) {
        switch (params.sort) {
          case 'DATE_ASC':
            filteredOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'DATE_DESC':
            filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'PRICE_ASC':
            filteredOrders.sort((a, b) => a.totalPrice - b.totalPrice);
            break;
          case 'PRICE_DESC':
            filteredOrders.sort((a, b) => b.totalPrice - a.totalPrice);
            break;
        }
      }

      const from = params?.from ? parseInt(params.from) : 0;
      const size = params?.size ? parseInt(params.size) : 10;
      const paginatedOrders = filteredOrders.slice(from, from + size);

      return {
        data: {
          items: paginatedOrders,
          total: filteredOrders.length
        }
      };
    }

    if (url === '/v1/menu-aggregate' || url === '/menu-aggregate') {
      const menuItemsWithRatings = mockMenuItems.map(item => {
        const itemReviews = mockReviews.filter(review => review.menuId === item.id);
        const avgStars = itemReviews.length > 0
          ? itemReviews.reduce((sum, review) => sum + review.rate, 0) / itemReviews.length
          : 0;
        
        const positiveRatings = itemReviews.filter(review => review.rate >= 4).length;
        const totalRatings = itemReviews.length;
        const wilsonScore = totalRatings > 0
          ? (positiveRatings + 1.9208) / (totalRatings + 1.9208) -
            (1.96 * Math.sqrt((positiveRatings * (totalRatings - positiveRatings)) / totalRatings + 0.9604)) /
            (totalRatings + 1.9208)
          : 0;

        return {
          ...item,
          wilsonScore,
          avgStars
        };
      });

      let filteredItems = menuItemsWithRatings;
      if (params?.category) {
        filteredItems = filteredItems.filter(item => item.category === params.category);
      }

      if (params?.sortBy) {
        switch (params.sortBy) {
          case 'AZ':
            filteredItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'ZA':
            filteredItems.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'DATE_ASC':
            filteredItems.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'DATE_DESC':
            filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'PRICE_ASC':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
          case 'PRICE_DESC':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
          case 'RATE_ASC':
            filteredItems.sort((a, b) => a.avgStars - b.avgStars);
            break;
          case 'RATE_DESC':
            filteredItems.sort((a, b) => b.avgStars - a.avgStars);
            break;
        }
      }

      return {
        data: filteredItems
      };
    }

    throw new Error(`Endpoint ${url} not found`);
  },

  post: async (url: string, data: any) => {
    console.log('Mock API POST request:', { url, data });
    await delay(300);

    if (url === '/v1/reviews' || url === '/reviews') {
      const newReview = {
        id: mockReviews.length + 1,
        ...data,
        createdAt: new Date().toISOString()
      };
      mockReviews.push(newReview);
      return { data: newReview };
    }

    if (url === '/v1/reviews/ratings' || url === '/reviews/ratings') {
      const { menuIds } = data;
      const ratings = menuIds.map((menuId: number) => {
        const itemReviews = mockReviews.filter(review => review.menuId === menuId);
        const averageRating = itemReviews.length > 0
          ? itemReviews.reduce((sum, review) => sum + review.rate, 0) / itemReviews.length
          : 0;
        
        return {
          menuId,
          averageRating,
          totalRatings: itemReviews.length
        };
      });

      return {
        data: {
          menuRatings: ratings
        }
      };
    }

    if (url === '/v1/menu-orders' || url === '/menu-orders') {
      const newOrder = {
        orderId: mockOrders.length + 1,
        ...data,
        status: 'NEW' as OrderStatus,
        createdAt: new Date().toISOString()
      };
      mockOrders.push(newOrder);
      return { data: newOrder };
    }

    if (url === '/v1/menu-items' || url === '/menu-items') {
      const newMenuItem = {
        id: mockMenuItems.length + 1,
        ...data,
        availability: data.availability ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockMenuItems.push(newMenuItem);
      return { data: newMenuItem };
    }

    throw new Error(`Endpoint ${url} not found`);
  },

  patch: async (url: string, data: any, config?: { headers?: any }) => {
    console.log('Mock API PATCH request:', { url, data });
    await delay(300);

    if (url.startsWith('/v1/menu-items/') || url.startsWith('/menu-items/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const index = mockMenuItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Menu item not found');
      }
      const updatedItem = { 
        ...mockMenuItems[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      mockMenuItems[index] = updatedItem;
      return { data: updatedItem };
    }

    throw new Error('Not found');
  },

  delete: async (url: string, config?: { headers?: any }) => {
    console.log('Mock API DELETE request:', { url });
    await delay(300);

    if (url.startsWith('/v1/menu-items/') || url.startsWith('/menu-items/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const index = mockMenuItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Menu item not found');
      }
      mockMenuItems.splice(index, 1);
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