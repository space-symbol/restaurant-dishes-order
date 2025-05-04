import { useState } from "react";
import { MenuList } from "@/entities/menu";
import { CartItem, useCartStore } from "@/entities/cart";
import { MenuItemWithRating } from "@/entities/menu/model/types/types";
import { Select, type SelectOption } from "@/shared/ui/select";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";

const categoryOptions: SelectOption[] = [
  { value: "ALL", label: "Все категории" },
  { value: "APPETIZER", label: "Закуски" },
  { value: "MAIN", label: "Основные блюда" },
  { value: "DESSERT", label: "Десерты" },
  { value: "DRINK", label: "Напитки" },
];

const sortOptions: SelectOption[] = [
  { value: "NAME_ASC", label: "По названию (А-Я)" },
  { value: "NAME_DESC", label: "По названию (Я-А)" },
  { value: "PRICE_ASC", label: "По цене (возр.)" },
  { value: "PRICE_DESC", label: "По цене (убыв.)" },
  { value: "RATING_DESC", label: "По рейтингу" },
];

export const MenuPage = () => {
  const [category, setCategory] = useState<MenuItemCategory | "ALL">("ALL");
  const [sort, setSort] = useState<MenuItemSort>("NAME_ASC");
  const { addItem } = useCartStore();

  // TODO: Заменить на реальные данные из API
  const mockItems: MenuItemWithRating[] = [];

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

  const filteredItems = mockItems.filter(item => 
    category === "ALL" || item.category === category
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sort) {
      case "NAME_ASC":
        return a.name.localeCompare(b.name);
      case "NAME_DESC":
        return b.name.localeCompare(a.name);
      case "PRICE_ASC":
        return a.price - b.price;
      case "PRICE_DESC":
        return b.price - a.price;
      case "RATING_DESC":
        return b.averageRating - a.averageRating;
      default:
        return 0;
    }
  });

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Меню</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as MenuItemCategory | "ALL")}
            options={categoryOptions}
            className="w-full sm:w-48"
          />
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as MenuItemSort)}
            options={sortOptions}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      <MenuList
        items={sortedItems}
        onAddToCart={handleAddToCart}
        showPagination={true}
        itemsPerPage={8}
      />
    </div>
  );
}; 