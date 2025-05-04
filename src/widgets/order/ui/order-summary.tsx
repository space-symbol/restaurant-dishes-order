import { formatCurrency } from "@/shared/lib/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { CartItem } from "@/entities/cart";
import cn from "@/shared/lib/cn";

interface OrderSummaryProps {
  items: CartItem[];
  className?: string;
}

export const OrderSummary = ({ items, className }: OrderSummaryProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className={cn("flex flex-col h-min justify-between", className)}>
      <CardHeader>
        <CardTitle>Ваш заказ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
              <p className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Итого</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 