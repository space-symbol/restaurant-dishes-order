import { HTMLAttributes, useState } from "react";
import { RatedMenuItem } from "@/entities/menu-aggregate";
import { MenuItemCard } from "./menu-item-card";
import { Loader } from "@/shared/ui/loader";
import { cn } from "@/shared/lib/utils";
import { MenuItemCategory, MenuItemSort } from "../model/schemas";
import { useMenuItemsWithRatings } from "@/features/menu-aggregate/model/hooks/use-menu-items-with-ratings";

interface MenuListProps extends HTMLAttributes<HTMLDivElement> {
  items?: RatedMenuItem[];
  onAddToCart?: (item: RatedMenuItem) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
  variant?: 'grid' | 'list';
  showPagination?: boolean;
  itemsPerPage?: number;
  isVisible?: boolean;
  initialCategory?: MenuItemCategory;
  initialSort?: MenuItemSort;
}

export const MenuList = (props: MenuListProps) => {
  const {
    items: propItems,
    onAddToCart,
    isLoading: propIsLoading,
    error: propError,
    className,
    variant = 'grid',
    showPagination = false,
    itemsPerPage = 8,
    isVisible = false,
    initialCategory,
    initialSort,
    ...otherProps
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading: hookIsLoading, error: hookError } = useMenuItemsWithRatings(
    { category: initialCategory, sort: initialSort },
    { enabled: !propItems }
  );

  const isLoading = propIsLoading ?? hookIsLoading;
  const error = propError ?? (hookError instanceof Error ? hookError.message : hookError ? String(hookError) : null);
  const items = propItems ?? (data ?? []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Блюд не найдено</p>
      </div>
    );
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = showPagination
    ? items.slice(startIndex, startIndex + itemsPerPage)
    : items;
  return (
    <div className={className} {...otherProps}>
      <div className={cn(
        "grid gap-4 sm:gap-8",
        variant === 'grid' 
          ? "grid-cols-1 xs:grid-cols-2 2xl:grid-cols-4"
          : "grid-cols-1"
      )}>
        {paginatedItems.map((item: RatedMenuItem, index: number) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            isVisible={isVisible}
            animationDelay={`${index * 0.2}s`}
          />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all",
                currentPage === page
                  ? "bg-restaurant-red text-white"
                  : "bg-white text-restaurant-dark hover:bg-restaurant-red/10"
              )}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 