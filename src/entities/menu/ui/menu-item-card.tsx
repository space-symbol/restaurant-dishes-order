import { MenuItemWithRating } from "@/entities/menu-aggregate/model/types/types";
import { Link } from "@/shared/ui/link";
import { StarIcon } from "@heroicons/react/24/solid";

interface MenuItemCardProps {
  item: MenuItemWithRating;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  return (
    <Link to={`/menu/${item.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">{item.averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({item.rating})</span>
          </div>
          <span className="font-semibold">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}; 