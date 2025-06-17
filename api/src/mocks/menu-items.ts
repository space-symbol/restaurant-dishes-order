export const mockMenuItems = [
  {
    id: "1",
    name: "Карбонара",
    category: "PASTA",
    price: 12.99,
    available: true,
    description: "Классическая итальянская паста с беконом, сливками и пармезаном",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
    createdAt: "2024-03-15T10:00:00Z",
    averageRating: 4.8,
    rating: 156,
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Лучшая карбонара в городе!",
        userName: "Анна",
        createdAt: "2024-03-16T15:30:00Z"
      },
      {
        id: "2",
        rating: 4,
        comment: "Очень вкусно, но могло бы быть больше бекона",
        userName: "Михаил",
        createdAt: "2024-03-17T12:45:00Z"
      }
    ]
  },
  {
    id: "2",
    name: "Стейк Рибай",
    category: "MEAT",
    price: 24.99,
    available: true,
    description: "Премиальный стейк из мраморной говядины, подается с овощами гриль",
    imageUrl: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=800&auto=format&fit=crop",
    createdAt: "2024-03-14T09:00:00Z",
    averageRating: 4.9,
    rating: 89,
    reviews: [
      {
        id: "3",
        rating: 5,
        comment: "Идеальная прожарка и сочность!",
        userName: "Дмитрий",
        createdAt: "2024-03-15T19:20:00Z"
      }
    ]
  },
  {
    id: "3",
    name: "Цезарь с курицей",
    category: "SALAD",
    price: 9.99,
    available: true,
    description: "Классический салат с куриным филе, хрустящими сухариками и соусом Цезарь",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop",
    createdAt: "2024-03-13T11:00:00Z",
    averageRating: 4.5,
    rating: 203,
    reviews: [
      {
        id: "4",
        rating: 4,
        comment: "Хороший салат, но соуса могло бы быть больше",
        userName: "Елена",
        createdAt: "2024-03-14T13:15:00Z"
      },
      {
        id: "5",
        rating: 5,
        comment: "Очень свежий и вкусный!",
        userName: "Сергей",
        createdAt: "2024-03-15T14:30:00Z"
      }
    ]
  }
]; 