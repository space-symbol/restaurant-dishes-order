import { useCartStore } from "@/entities/cart";
import { formatCurrency } from "@/shared/lib/currency";
import { Button } from "@/shared/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const CartItem = ({ id, name, price, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-medium truncate">{name}</h3>
        <p className="text-sm text-gray-600">{formatCurrency(price)}</p>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-6 sm:w-8 text-center font-medium">{quantity}</span>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeItem(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 