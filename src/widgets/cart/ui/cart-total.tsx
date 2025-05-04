import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/entities/cart";
import { formatCurrency } from "@/shared/lib/currency";

export const CartTotal = () => {
  const { getTotal } = useCartStore();

  return (
    <div className="mt-6 pt-6 border-t bg-white">
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Итого:</span>
        <span className="font-bold">{formatCurrency(getTotal())}</span>
      </div>
    </div>
  );
}; 