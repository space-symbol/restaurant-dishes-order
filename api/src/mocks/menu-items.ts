// Генерируем даты для сегодня от 8 до 9 утра
function getTodayMorningTimes(count: number): string[] {
  const dates: string[] = [];
  const usedMinutes = new Set<number>();
  
  for (let i = 0; i < count; i++) {
    let minutes: number;
    do {
      minutes = Math.floor(Math.random() * 60);
    } while (usedMinutes.has(minutes));
    
    usedMinutes.add(minutes);
    
    const today = new Date();
    const seconds = Math.floor(Math.random() * 60);
    today.setHours(8, minutes, seconds, 0);
    
    dates.push(today.toISOString());
  }
  
  return dates.sort(); // Сортируем по времени
}

const todayDates = getTodayMorningTimes(10); // Генерируем достаточно дат для всех записей

export const mockMenuItems = [
  {
    id: "1",
    name: "Карбонара",
    category: "PASTA",
    price: 12.99,
    available: true,
    description: "Классическая итальянская паста с беконом, сливками и пармезаном",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
    createdAt: todayDates[0],
    averageRating: 4.8,
    rating: 156,
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Лучшая карбонара в городе!",
        userName: "Анна",
        createdAt: todayDates[1]
      },
      {
        id: "2",
        rating: 4,
        comment: "Очень вкусно, но могло бы быть больше бекона",
        userName: "Михаил",
        createdAt: todayDates[2]
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
    createdAt: todayDates[3],
    averageRating: 4.9,
    rating: 89,
    reviews: [
      {
        id: "3",
        rating: 5,
        comment: "Идеальная прожарка и сочность!",
        userName: "Дмитрий",
        createdAt: todayDates[4]
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
    createdAt: todayDates[5],
    averageRating: 4.5,
    rating: 203,
    reviews: [
      {
        id: "4",
        rating: 4,
        comment: "Хороший салат, но соуса могло бы быть больше",
        userName: "Елена",
        createdAt: todayDates[6]
      },
      {
        id: "5",
        rating: 5,
        comment: "Очень свежий и вкусный!",
        userName: "Сергей",
        createdAt: todayDates[7]
      }
    ]
  }
]; 