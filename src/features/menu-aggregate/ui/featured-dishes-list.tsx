import { CartItem, useCartStore } from "@/entities/cart";
import { MenuItemWithRating, MenuList } from "@/entities/menu";
import { Loader } from "@/shared/ui/loader";
import { cn } from "@/shared/lib/utils";
import { useMenuItemsWithRatings } from "../model/hooks/use-menu-items-with-ratings";
import type { Route } from "@/app/routes/home/+types/home";

interface FeaturedDishesListProps {
  isVisible: boolean;
  initialData?: Route.LoaderData['featuredDishes'];
}

export const FeaturedDishesList = ({ isVisible, initialData }: FeaturedDishesListProps) => {
  const { addItem } = useCartStore();
  const { data: menuItems, isLoading, error } = useMenuItemsWithRatings(
    { sort: 'RATE_DESC' },
    {
      initialData: initialData ? {
        items: initialData.items,
        total: initialData.total,
      } : undefined
    }
  );

  const handleAddToCart = (item: MenuItemWithRating) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: "1"
    };
    
    addItem(cartItem);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error py-8">
        <p>Ошибка загрузки блюд</p>
      </div>
    );
  }

  if (!menuItems) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Блюд не найдено</p>
      </div>
    );
  }

  return (
    <MenuList
      items={menuItems.items}
      onAddToCart={handleAddToCart}
      showFeaturedOnly={true}
      showPagination={true}
      itemsPerPage={4}
      className={cn(
        "opacity-0",
        isVisible && "animate-fade-in"
      )}
      style={{ animationDelay: "0.4s" }}
      isVisible={isVisible}
    />
  );
}; 