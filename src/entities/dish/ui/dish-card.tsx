import { Badge } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Rating } from "@/shared/ui/rating";
import cn from "@/shared/lib/cn";
import { formatCurrency } from "@/shared/lib/currency";
import { Link } from "@/shared/ui/link";

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "starters" | "mains" | "desserts";
  featured?: boolean;
  new?: boolean;
  rating?: number;
}

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
  className?: string;
  animationDelay?: string;
  isVisible?: boolean;
}

export const DishCard = ({ 
  dish, 
  onAddToCart, 
  className,
  animationDelay,
  isVisible 
}: DishCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(dish);
  };

  return (
    <Link to={`/menu/${dish.id}`}>
      <Card 
        className={cn(
          "overflow-hidden border-none shadow-lg card-hover opacity-0 cursor-pointer",
          isVisible && "animate-scale-in",
          className
        )}
        style={{ animationDelay }}
      >
        <div className="relative h-60">
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {dish.new && (
              <Badge className="text-restaurant-red animate-pulse">Новинка</Badge>
            )}
            {dish.featured && (
              <Badge area-label="Рекомендуем" className="fill-restaurant-red animate-pulse">Рекомендуем</Badge>
            )}
          </div>
        </div>
        <div className="grid grid-rows-[3.5rem_5rem_3.5rem] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold">{dish.name}</h3>
            <span className="text-restaurant-red font-medium">{formatCurrency(dish.price)}</span>
          </div>
          <div className="space-y-2">
            <p className="text-restaurant-gray text-sm">{dish.description}</p>
            {dish.rating !== undefined && (
              <div className="flex items-center gap-2">
                <Rating rating={dish.rating} size="sm" />
                <span className="text-sm text-restaurant-gray">{dish.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full hover:scale-105 transition-transform duration-200"
          >
            В корзину
          </Button>
        </div>
      </Card>
    </Link>
  );
}; 