import { useHasOrderedItem } from "@/features/order/model/hooks/use-has-ordered-item";
import { mockMenuItems, type MenuItem } from "@/shared/api/mock-data";
import { ReviewsSection } from "./reviews-section";
import { cn } from "@/shared/lib/utils";
import { StarIcon } from "lucide-react";

interface DishDetailsProps {
  menuId: string;
  className?: string;
}

export const DishDetails = ({ menuId, className }: DishDetailsProps) => {
  const hasOrdered = useHasOrderedItem(menuId);
  const menuItem = mockMenuItems.find((item: MenuItem) => item.id === Number(menuId));

  if (!menuItem) {
    return (
      <div className="text-center text-gray-500 py-8">
        Блюдо не найдено
      </div>
    );
  }

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img 
            src={menuItem.imageUrl} 
            alt={menuItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{menuItem.name}</h1>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-medium">4.5</span>
              <span className="text-sm opacity-80">(2 отзыва)</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{menuItem.price.toFixed(2)} ₽</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {menuItem.category}
            </span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">{menuItem.description}</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <ReviewsSection
          reviews={[]}
          rating={2}
          averageRating={4.5}
          hasOrdered={hasOrdered}
        />
      </div>
    </div>
  );
}; 