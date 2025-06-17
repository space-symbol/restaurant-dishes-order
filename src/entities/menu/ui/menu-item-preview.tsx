import { Link } from "react-router";
import { MenuItem } from "../model/schemas";
import { cn } from "@/shared/lib/utils";

interface MenuItemPreviewProps {
  menuItem: MenuItem;
  className?: string;
}

export const MenuItemPreview = ({ menuItem, className }: MenuItemPreviewProps) => {
  return (
    <Link
      to={`/menu/${menuItem.id}`}
      className={cn(
        "block group hover:shadow-lg transition-all duration-200 rounded-lg overflow-hidden bg-white border border-gray-200",
        className
      )}
    >
      <div className="flex items-center gap-4 p-4">
        {menuItem.imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {menuItem.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {menuItem.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-gray-900">
              {menuItem.price.toFixed(2)} ₽
            </span>
            <span className="text-xs text-gray-400 capitalize">
              {menuItem.category.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 