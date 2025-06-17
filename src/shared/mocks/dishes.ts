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
        id: 1,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 1,
        createdBy: "user1@example.com",
        comment: "Отличное блюдо! Очень вкусно.",
        rate: 5
      },
      {
        id: 2,
        createdAt: "2024-01-14T15:45:00Z",
        menuId: 1,
        createdBy: "user2@example.com",
        comment: "Хорошо, но могло бы быть лучше.",
        rate: 4
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
        id: 3,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 2,
        createdBy: "user3@example.com",
        comment: "Идеальная прожарка и сочность!",
        rate: 5
      },
      {
        id: 4,
        createdAt: "2024-01-14T15:45:00Z",
        menuId: 2,
        createdBy: "user4@example.com",
        comment: "Очень вкусно, но могло бы быть больше бекона",
        rate: 4
      },
      {
        id: 5,
        createdAt: "2024-01-13T10:30:00Z",
        menuId: 2,
        createdBy: "user5@example.com",
        comment: "Хорошо, но немного суховато",
        rate: 3
      },
      {
        id: 6,
        createdAt: "2024-01-12T14:15:00Z",
        menuId: 2,
        createdBy: "user6@example.com",
        comment: "Скучно, не рекомендую",
        rate: 2
      },
      {
        id: 7,
        createdAt: "2024-01-11T16:40:00Z",
        menuId: 2,
        createdBy: "user7@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 8,
        createdAt: "2024-01-10T16:40:00Z",
        menuId: 2,
        createdBy: "user8@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 9,
        createdAt: "2024-01-09T16:40:00Z",
        menuId: 2,
        createdBy: "user9@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 10,
        createdAt: "2024-01-08T16:40:00Z",
        menuId: 2,
        createdBy: "user10@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 11,
        createdAt: "2024-01-07T16:40:00Z",
        menuId: 2,
        createdBy: "user11@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 12,
        createdAt: "2024-01-06T16:40:00Z",
        menuId: 2,
        createdBy: "user12@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 13,
        createdAt: "2024-01-05T16:40:00Z",
        menuId: 2,
        createdBy: "user13@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 14,
        createdAt: "2024-01-04T16:40:00Z",
        menuId: 2,
        createdBy: "user14@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
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
        id: 4,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 3,
        createdBy: "user4@example.com",
        comment: "Хороший салат, но соуса могло бы быть больше",
        rate: 4
      },
      {
        id: 5,
        createdAt: "2024-01-14T15:45:00Z",
        menuId: 3,
        createdBy: "user5@example.com",
        comment: "Очень свежий и вкусный!",
        rate: 5
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
        id: 6,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 4,
        createdBy: "user6@example.com",
        comment: "Нежнейший десерт, просто тает во рту!",
        rate: 5
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
        id: 7,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 5,
        createdBy: "user7@example.com",
        comment: "Невероятное сочетание вкусов!",
        rate: 5
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
        id: 8,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 6,
        createdBy: "user8@example.com",
        comment: "Невероятно нежные гребешки, идеальное сочетание с трюфельным пюре",
        rate: 5
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
        id: 9,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 7,
        createdBy: "user9@example.com",
        comment: "Изысканное блюдо, равиоли просто тают во рту",
        rate: 5
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
        id: 10,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 8,
        createdBy: "user10@example.com",
        comment: "Лучшая утка в городе! Идеальная корочка и сочность",
        rate: 5
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
        id: 11,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 9,
        createdBy: "user11@example.com",
        comment: "Очень свежий и легкий, отличное начало трапезы",
        rate: 4
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
        id: 12,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 10,
        createdBy: "user12@example.com",
        comment: "Идеальный фондан! Шоколадная сердцевина просто божественна",
        rate: 5
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
        id: 13,
        createdAt: "2024-01-15T10:30:00Z",
        menuId: 11,
        createdBy: "user13@example.com",
        comment: "Невероятно ароматное ризотто, идеальная консистенция",
        rate: 5
      }
    ]
  }
]; 