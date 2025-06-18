import { type Review } from "@/entities/review";
import { getTodayMorningTimes } from '@/shared/lib/date-utils';

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

// Генерируем даты для сегодня от 8 до 9 утра
const todayDates = getTodayMorningTimes(50); // Генерируем достаточно дат для всех записей

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Карбонара",
    category: "Паста",
    price: 12.99,
    available: true,
    description: "Классическая итальянская паста с беконом, сливками и пармезаном",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
    createdAt: todayDates[0],
    averageRating: 4.8,
    rating: 156,
    featured: true,
    reviews: [
      {
        id: 1,
        createdAt: todayDates[1],
        menuId: 1,
        createdBy: "user1@example.com",
        comment: "Отличное блюдо! Очень вкусно.",
        rate: 5
      },
      {
        id: 2,
        createdAt: todayDates[2],
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
    createdAt: todayDates[3],
    averageRating: 4.9,
    rating: 89,
    featured: true,
    new: true,
    reviews: [
      {
        id: 3,
        createdAt: todayDates[4],
        menuId: 2,
        createdBy: "user3@example.com",
        comment: "Идеальная прожарка и сочность!",
        rate: 5
      },
      {
        id: 4,
        createdAt: todayDates[5],
        menuId: 2,
        createdBy: "user4@example.com",
        comment: "Очень вкусно, но могло бы быть больше бекона",
        rate: 4
      },
      {
        id: 5,
        createdAt: todayDates[6],
        menuId: 2,
        createdBy: "user5@example.com",
        comment: "Хорошо, но немного суховато",
        rate: 3
      },
      {
        id: 6,
        createdAt: todayDates[7],
        menuId: 2,
        createdBy: "user6@example.com",
        comment: "Скучно, не рекомендую",
        rate: 2
      },
      {
        id: 7,
        createdAt: todayDates[8],
        menuId: 2,
        createdBy: "user7@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 8,
        createdAt: todayDates[9],
        menuId: 2,
        createdBy: "user8@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 9,
        createdAt: todayDates[10],
        menuId: 2,
        createdBy: "user9@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 10,
        createdAt: todayDates[11],
        menuId: 2,
        createdBy: "user10@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 11,
        createdAt: todayDates[12],
        menuId: 2,
        createdBy: "user11@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 12,
        createdAt: todayDates[13],
        menuId: 2,
        createdBy: "user12@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 13,
        createdAt: todayDates[14],
        menuId: 2,
        createdBy: "user13@example.com",
        comment: "Очень плохо, не понравилось",
        rate: 1
      },
      {
        id: 14,
        createdAt: todayDates[15],
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
    createdAt: todayDates[16],
    averageRating: 4.5,
    rating: 203,
    featured: true,
    reviews: [
      {
        id: 4,
        createdAt: todayDates[17],
        menuId: 3,
        createdBy: "user4@example.com",
        comment: "Хороший салат, но соуса могло бы быть больше",
        rate: 4
      },
      {
        id: 5,
        createdAt: todayDates[18],
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
    createdAt: todayDates[19],
    averageRating: 4.7,
    rating: 178,
    featured: true,
    reviews: [
      {
        id: 6,
        createdAt: todayDates[20],
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
    createdAt: todayDates[21],
    averageRating: 4.6,
    rating: 145,
    new: true,
    reviews: [
      {
        id: 7,
        createdAt: todayDates[22],
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
    createdAt: todayDates[23],
    averageRating: 4.9,
    rating: 92,
    featured: true,
    reviews: [
      {
        id: 8,
        createdAt: todayDates[24],
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
    createdAt: todayDates[25],
    averageRating: 4.7,
    rating: 78,
    new: true,
    reviews: [
      {
        id: 9,
        createdAt: todayDates[26],
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
    createdAt: todayDates[27],
    averageRating: 4.8,
    rating: 156,
    featured: true,
    reviews: [
      {
        id: 10,
        createdAt: todayDates[28],
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
    createdAt: todayDates[29],
    averageRating: 4.6,
    rating: 89,
    new: true,
    reviews: [
      {
        id: 11,
        createdAt: todayDates[30],
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
    createdAt: todayDates[31],
    averageRating: 4.9,
    rating: 203,
    featured: true,
    reviews: [
      {
        id: 12,
        createdAt: todayDates[32],
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
    createdAt: todayDates[33],
    averageRating: 4.7,
    rating: 145,
    featured: true,
    reviews: [
      {
        id: 13,
        createdAt: todayDates[34],
        menuId: 11,
        createdBy: "user13@example.com",
        comment: "Невероятно ароматное ризотто, идеальная консистенция",
        rate: 5
      }
    ]
  }
]; 