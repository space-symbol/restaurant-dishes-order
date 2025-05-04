import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui/button";

export const CartSwitcher = () => {
  const { items, toggleCart } = useCartStore();

  return (
    <Button
      onClick={toggleCart}
      variant="ghost"
      size="icon"
      className="relative p-2 hover:bg-gray-100 rounded-full"
      aria-label="Открыть корзину"
    >
      <ShoppingCart size={24} />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-restaurant-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Button>
  );
}; 