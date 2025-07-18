import { RatedMenuItem } from "@/entities/menu-aggregate";
import { Link } from "@/shared/ui/link";
import { Button } from "@/shared/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatCurrency } from "@/shared/lib/currency";
import { routesConfig } from "@/shared/config/routes";
import { RatingDisplay } from "@/shared/ui/rating-display";
import { CATEGORY_MAP } from "@/shared/constants/menu-options";

interface MenuItemCardProps {
  item: RatedMenuItem;
  onAddToCart?: (item: RatedMenuItem) => void;
  className?: string;
  animationDelay?: string;
  isVisible?: boolean;
}

export const MenuItemCard = ({ 
  item, 
  onAddToCart, 
  className,
  animationDelay,
  isVisible 
}: MenuItemCardProps) => {
  // На мобильных устройствах показываем элемент по умолчанию, если isVisible не определен
  const shouldBeVisible = isVisible !== undefined ? isVisible : true;
  
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300",
        shouldBeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{ animationDelay }}
    >
      <Link to={`${routesConfig.home.menu.path}/${item.id}`} className="block">
        <div className="h-48 sm:h-60">
          {item.imageUrl && (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>
        <div className="grid grid-rows-[3rem_5rem] sm:grid-rows-[3.5rem_6rem] gap-2 p-3 sm:p-5">
          <div>
            <h3 className="font-medium text-base sm:text-lg mb-1">{item.name}</h3>
            <div className="flex items-center gap-2">
              <RatingDisplay rating={item.avgStars} showValue />
              <span className="text-xs sm:text-sm text-gray-500">({item.wilsonScore.toFixed(1)})</span>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium text-sm sm:text-base">{formatCurrency(item.price)}</span>
              <span className="text-xs sm:text-sm text-gray-500">{CATEGORY_MAP[item.category as keyof typeof CATEGORY_MAP]}</span>
            </div>
          </div>
        </div>
      </Link>
      {onAddToCart && (
        <div className="p-3 sm:p-5 pt-0">
          <Button 
            variant="outline" 
            className="w-full text-xs sm:text-sm"
            onClick={() => onAddToCart(item)}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Добавить в корзину
          </Button>
        </div>
      )}
    </div>
  );
}; 