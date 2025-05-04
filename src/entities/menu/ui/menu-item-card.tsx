import { MenuItemWithRating } from "../model/types/types";
import { Link } from "@/shared/ui/link";
import { Button } from "@/shared/ui/button";
import {  ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatCurrency } from "@/shared/lib/currency";
import { routesConfig } from "@/shared/config/routes";
import { Rating } from "@/shared/ui/rating";

interface MenuItemCardProps {
  item: MenuItemWithRating;
  onAddToCart?: (item: MenuItemWithRating) => void;
  className?: string;
  animationDelay?: string;
  isVisible?: boolean;
}

export const MenuItemCard = (props: MenuItemCardProps) => {
  const {
    item,
    onAddToCart,
    className,
    animationDelay,
    isVisible,
  } = props;

  return (
    <div className={cn(
          "overflow-hidden border-none shadow-lg card-hover opacity-0 cursor-pointer",
          isVisible && "animate-scale-in",
          className
        )}
        style={{ animationDelay }}
    >
      <Link to={`${routesConfig.home.menu.path}/${item.id}`} className="block">
        <div className="h-60">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="grid grid-rows-[3.5rem_6rem] sm:grid-rows-[3rem_5rem] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
            <span className="text-restaurant-red font-medium">{formatCurrency(item.price)}</span>
          </div>
          <div className="grid">
            <p className="text-restaurant-gray text-sm">{item.description}</p>
            {item.rating !== undefined && (
              <div className="flex items-center gap-2">
                <Rating rating={item.availability ? item.rating.averageRating : 0} size="sm" />
                <span className="text-sm text-restaurant-gray">({item.rating.totalReviews})</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      {onAddToCart && (
        <Button
          className="w-full"  
          onClick={() => onAddToCart(item)}
          disabled={!item.availability}
        >
          <ShoppingCart className="w-4 h-4" />
          {item.availability ? 'Добавить в корзину' : 'Нет в наличии'}
        </Button>
      )}
    </div>
  );
}; 