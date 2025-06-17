import { CartItem, useCartStore } from "@/entities/cart";
import { MenuList } from "@/entities/menu";
import { Loader } from "@/shared/ui/loader";
import { cn } from "@/shared/lib/utils";
import { useMenuItemsWithRatings } from "../model/hooks/use-menu-items-with-ratings";
import type { Route } from "@/app/routes/home/+types/home";
import { useState } from "react";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";
import { RatedMenuItem } from "@/entities/menu-aggregate/model/schemas";
import { MenuFilters } from "./menu-filters";

interface DishesListProps {
  isVisible: boolean;
  initialData?: Route.LoaderData['featuredDishes'];
}

export const DishesList = ({ isVisible, initialData }: DishesListProps) => {
  const { addItem } = useCartStore();
  const [category, setCategory] = useState<MenuItemCategory | undefined>();
  const [sort, setSort] = useState<MenuItemSort>('RATE_DESC');

  const { data: menuItems, isLoading, error } = useMenuItemsWithRatings(
    { category, sort },
    {
      initialData: initialData?.items
    }
  );

  const handleAddToCart = (item: RatedMenuItem) => {
    const cartItem: CartItem = {
      id: String(item.id),
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
    <div className="space-y-8">
      <MenuFilters
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        className="mx-auto"
      />

      <MenuList
        items={menuItems}
        onAddToCart={handleAddToCart}
        showPagination={true}
        itemsPerPage={4}
        className={cn(
          "opacity-0",
          isVisible && "animate-fade-in"
        )}
        style={{ animationDelay: "0.4s" }}
        isVisible={isVisible}
      />
    </div>
  );
}; 