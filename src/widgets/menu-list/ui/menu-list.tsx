import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { useState } from "react";
import { MenuItemCard } from "@/entities/menu/ui/menu-item-card";
import { useMenuItemsWithRatings } from "@/features/menu-aggregate/model/hooks/use-menu-items-with-ratings";
import { Loader } from "@/shared/ui/loader";

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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MenuItemCategory)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="appetizers">Appetizers</option>
          <option value="main_courses">Main Courses</option>
          <option value="desserts">Desserts</option>
          <option value="drinks">Drinks</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as MenuItemSort | 'RATE_ASC' | 'RATE_DESC')}
          className="p-2 border rounded"
        >
          <option value="">Default</option>
          <option value="AZ">Name (A-Z)</option>
          <option value="ZA">Name (Z-A)</option>
          <option value="PRICE_ASC">Price (Low to High)</option>
          <option value="PRICE_DESC">Price (High to Low)</option>
          <option value="DATE_ASC">Date (Oldest)</option>
          <option value="DATE_DESC">Date (Newest)</option>
          <option value="RATE_ASC">Rating (Low to High)</option>
          <option value="RATE_DESC">Rating (High to Low)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.data.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}; 