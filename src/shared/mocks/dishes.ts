import { type Review } from "@/entities/review";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  description: string;
  imageUrl: string;
  createdAt: string;
  averageRating: number;
  rating: number;
  reviews: Review[];
  featured?: boolean;
  new?: boolean;
}

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Карбонара",
    category: "Паста",
    price: 12.99,
    available: true,
    description: "Классическая итальянская паста с беконом, сливками и пармезаном",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
    createdAt: "2024-03-15T10:00:00Z",
    averageRating: 4.8,
    rating: 156,
    featured: true,
    reviews: [
      {
        reviewId: "1",
        userId: "1",
        updatedAt: "2024-03-16T15:30:00Z",
        rating: 5,
        comment: "Лучшая карбонара в городе!",
        createdAt: "2024-03-16T15:30:00Z"
      },
      {
        reviewId: "2",
        userId: "2",
        updatedAt: "2024-03-17T12:45:00Z",
        rating: 4,
        comment: "Очень вкусно, но могло бы быть больше бекона",
        createdAt: "2024-03-17T12:45:00Z"
      }
    ]
  },
  {
    id: "2",
    name: "Стейк Рибай",
    category: "Мясо",
    price: 24.99,
    available: true,
    description: "Премиальный стейк из мраморной говядины, подается с овощами гриль",
    imageUrl: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=800&auto=format&fit=crop",
    createdAt: "2024-03-14T09:00:00Z",
    averageRating: 4.9,
    rating: 89,
    featured: true,
    new: true,
    reviews: [
      {
        reviewId: "3",
        userId: "3",
        updatedAt: "2024-03-15T19:20:00Z",
        rating: 5,
        comment: "Идеальная прожарка и сочность!",
        createdAt: "2024-03-15T19:20:00Z"
      },
      {
        reviewId: "4",
        userId: "4",
        updatedAt: "2024-03-17T12:45:00Z",
        rating: 4,
        comment: "Очень вкусно, но могло бы быть больше бекона",
        createdAt: "2024-03-17T12:45:00Z"
      },
      {
        reviewId: "5",
        userId: "5",
        updatedAt: "2024-03-18T10:30:00Z",
        rating: 3,
        comment: "Хорошо, но немного суховато",
        createdAt: "2024-03-18T10:30:00Z"
      },
      {
        reviewId: "6",
        userId: "6",
        updatedAt: "2024-03-19T14:15:00Z",
        rating: 2,
        comment: "Скучно, не рекомендую",
        createdAt: "2024-03-19T14:15:00Z"
      },
      {
        reviewId: "7",
        userId: "7",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "8",
        userId: "8",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "9",
        userId: "9",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "10",
        userId: "10",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "11",
        userId: "11",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "12",
        userId: "12",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "13",
        userId: "13",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
      {
        reviewId: "14",
        userId: "14",
        updatedAt: "2024-03-20T16:40:00Z",
        rating: 1,
        comment: "Очень плохо, не понравилось",
        createdAt: "2024-03-20T16:40:00Z"
      },
    ]
  },
  {
    id: "3",
    name: "Цезарь с курицей",
    category: "Салаты",
    price: 9.99,
    available: true,
    description: "Классический салат с куриным филе, хрустящими сухариками и соусом Цезарь",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop",
    createdAt: "2024-03-13T11:00:00Z",
    averageRating: 4.5,
    rating: 203,
    featured: true,
    reviews: [
      {
        reviewId: "4",
        userId: "4",
        updatedAt: "2024-03-14T13:15:00Z",
        rating: 4,
        comment: "Хороший салат, но соуса могло бы быть больше",
        createdAt: "2024-03-14T13:15:00Z"
      },
      {
        reviewId: "5",
        userId: "5",
        updatedAt: "2024-03-15T14:30:00Z",
        rating: 5,
        comment: "Очень свежий и вкусный!",
        createdAt: "2024-03-15T14:30:00Z"
      }
    ]
  },
  {
    id: "4",
    name: "Тирамису",
    category: "Десерты",
    price: 8.99,
    available: true,
    description: "Классический итальянский десерт с кофе, маскарпоне и какао",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
    createdAt: "2024-03-12T14:00:00Z",
    averageRating: 4.7,
    rating: 178,
    featured: true,
    reviews: [
      {
        reviewId: "6",
        userId: "6",
        updatedAt: "2024-03-13T16:20:00Z",
        rating: 5,
        comment: "Нежнейший десерт, просто тает во рту!",
        createdAt: "2024-03-13T16:20:00Z"
      }
    ]
  },
  {
    id: "5",
    name: "Бургер с трюфелем",
    category: "Бургеры",
    price: 15.99,
    available: true,
    description: "Премиальный бургер с трюфельным соусом, говяжьей котлетой и карамелизированным луком",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    createdAt: "2024-03-11T13:00:00Z",
    averageRating: 4.6,
    rating: 145,
    new: true,
    reviews: [
      {
        reviewId: "7",
        userId: "7",
        updatedAt: "2024-03-12T18:45:00Z",
        rating: 5,
        comment: "Невероятное сочетание вкусов!",
        createdAt: "2024-03-12T18:45:00Z"
      }
    ]
  },
  {
    id: "6",
    name: "Морские гребешки",
    category: "Морепродукты",
    price: 28.99,
    available: true,
    description: "Свежие гребешки с трюфельным пюре и хрустящей панчеттой",
    imageUrl: "https://images.unsplash.com/photo-1532980202625-3716ed8f3102?w=800&auto=format&fit=crop",
    createdAt: "2024-03-10T12:00:00Z",
    averageRating: 4.9,
    rating: 92,
    featured: true,
    reviews: [
      {
        reviewId: "8",
        userId: "8",
        updatedAt: "2024-03-11T19:30:00Z",
        rating: 5,
        comment: "Невероятно нежные гребешки, идеальное сочетание с трюфельным пюре",
        createdAt: "2024-03-11T19:30:00Z"
      }
    ]
  },
  {
    id: "7",
    name: "Равиоли с лобстером",
    category: "Паста",
    price: 22.99,
    available: true,
    description: "Домашние равиоли с начинкой из лобстера и рикотты, подаются с шафрановым соусом",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop",
    createdAt: "2024-03-09T15:00:00Z",
    averageRating: 4.7,
    rating: 78,
    new: true,
    reviews: [
      {
        reviewId: "9",
        userId: "9",
        updatedAt: "2024-03-10T20:15:00Z",
        rating: 5,
        comment: "Изысканное блюдо, равиоли просто тают во рту",
        createdAt: "2024-03-10T20:15:00Z"
      }
    ]
  },
  {
    id: "8",
    name: "Утка по-пекински",
    category: "Мясо",
    price: 32.99,
    available: true,
    description: "Традиционное блюдо с хрустящей корочкой, подается с соусом хойсин и блинчиками",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop",
    createdAt: "2024-03-08T11:00:00Z",
    averageRating: 4.8,
    rating: 156,
    featured: true,
    reviews: [
      {
        reviewId: "10",
        userId: "10",
        updatedAt: "2024-03-09T18:45:00Z",
        rating: 5,
        comment: "Лучшая утка в городе! Идеальная корочка и сочность",
        createdAt: "2024-03-09T18:45:00Z"
      }
    ]
  },
  {
    id: "9",
    name: "Тартар из тунца",
    category: "Закуски",
    price: 18.99,
    available: true,
    description: "Свежий тунец с авокадо, цитрусовым соусом и кунжутом",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop",
    createdAt: "2024-03-07T14:00:00Z",
    averageRating: 4.6,
    rating: 89,
    new: true,
    reviews: [
      {
        reviewId: "11",
        userId: "11",
        updatedAt: "2024-03-08T17:30:00Z",
        rating: 4,
        comment: "Очень свежий и легкий, отличное начало трапезы",
        createdAt: "2024-03-08T17:30:00Z"
      }
    ]
  },
  {
    id: "10",
    name: "Шоколадный фондан",
    category: "Десерты",
    price: 9.99,
    available: true,
    description: "Теплый шоколадный торт с тающей сердцевиной, подается с ванильным мороженым",
    imageUrl: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=800&auto=format&fit=crop",
    createdAt: "2024-03-06T13:00:00Z",
    averageRating: 4.9,
    rating: 203,
    featured: true,
    reviews: [
      {
        reviewId: "12",
        userId: "12",
        updatedAt: "2024-03-07T16:20:00Z",
        rating: 5,
        comment: "Идеальный фондан! Шоколадная сердцевина просто божественна",
        createdAt: "2024-03-07T16:20:00Z"
      }
    ]
  },
  {
    id: "11",
    name: "Ризотто с грибами",
    category: "Паста",
    price: 16.99,
    available: true,
    description: "Кремовое ризотто с белыми грибами, трюфельным маслом и пармезаном",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop",
    createdAt: "2024-03-05T12:00:00Z",
    averageRating: 4.7,
    rating: 145,
    featured: true,
    reviews: [
      {
        reviewId: "13",
        userId: "13",
        updatedAt: "2024-03-06T15:45:00Z",
        rating: 5,
        comment: "Невероятно ароматное ризотто, идеальная консистенция",
        createdAt: "2024-03-06T15:45:00Z"
      }
    ]
  }
]; 