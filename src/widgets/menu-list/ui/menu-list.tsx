import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";
import { useMenuItemsWithRatings } from "@/features/menu-aggregate/model/hooks/use-menu-items-with-ratings";
import { MenuItemCard } from "@/entities/menu/ui/menu-item-card";
import { useState } from "react";
import { RatedMenuItem } from "@/entities/menu-aggregate/model/schemas";

interface MenuListProps {
  initialCategory?: MenuItemCategory;
  initialSort?: MenuItemSort;
}

export const MenuList = ({ initialCategory, initialSort }: MenuListProps) => {
  const [category, setCategory] = useState<MenuItemCategory | undefined>(initialCategory);
  const [sort, setSort] = useState<MenuItemSort | undefined>(initialSort);

  const { data, isLoading, error } = useMenuItemsWithRatings({
    category,
    sort
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error loading menu items:', error);
    return <div className="text-red-500">Ошибка загрузки блюд: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No menu items found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}; 