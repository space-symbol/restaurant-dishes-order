import { cn } from "@/shared/lib/utils";
import { MenuItemCategory, MenuItemSort } from "@/entities/menu/model/schemas";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "@/shared/constants/menu-options";

interface MenuFiltersProps {
  category?: MenuItemCategory;
  sort: MenuItemSort;
  onCategoryChange: (category: MenuItemCategory | undefined) => void;
  onSortChange: (sort: MenuItemSort) => void;
  className?: string;
}

export const MenuFilters = ({
  category,
  sort,
  onCategoryChange,
  onSortChange,
  className
}: MenuFiltersProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Категории</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={cn(
                "relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors",
                category === option.value || (!category && option.value === 'ALL')
                  ? "bg-restaurant-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <input
                type="radio"
                name="category"
                value={option.value}
                checked={category === option.value || (!category && option.value === 'ALL')}
                onChange={() => onCategoryChange(option.value === 'ALL' ? undefined : option.value as MenuItemCategory)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Сортировка</h3>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={cn(
                "relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors",
                sort === option.value
                  ? "bg-restaurant-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sort === option.value}
                onChange={() => onSortChange(option.value as MenuItemSort)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 