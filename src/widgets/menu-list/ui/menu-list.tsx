import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { useState } from "react";
import { MenuItemCard } from "@/entities/menu/ui/menu-item-card";
import { useMenuItemsWithRatings } from "@/features/menu-aggregate/model/hooks/use-menu-items-with-ratings";
import { Loader } from "@/shared/ui/loader";
import { Select } from "@/shared/ui/select";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "@/shared/constants/menu-options";

export const MenuList = () => {
  const [category, setCategory] = useState<MenuItemCategory | undefined>();
  const [sort, setSort] = useState<MenuItemSort | 'RATE_ASC' | 'RATE_DESC'>();

  const { data: menuItems, isLoading, error } = useMenuItemsWithRatings({
    category,
    sort,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading menu items
      </div>
    );
  }

  if (!menuItems?.data) {
    return (
      <div className="text-center text-gray-500 py-8">
        No menu items found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as MenuItemCategory)}
          className="p-2 border rounded"
          options={CATEGORY_OPTIONS}
        />

        <Select
          value={sort}
          onValueChange={(value) => setSort(value as MenuItemSort | 'RATE_ASC' | 'RATE_DESC')}
          className="p-2 border rounded"
          options={SORT_OPTIONS}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.data.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}; 