import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { routesConfig } from "@/shared/config/routes";
import { useAppNavigate } from "@/shared/hooks/use-navigate";

interface OrderHeaderProps {
  className?: string;
}

export const OrderHeader = ({ className }: OrderHeaderProps) => {
  const navigate = useAppNavigate();

  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <h1 className="text-2xl font-bold">Оформление заказа</h1>
      <Button
        variant="outline"
        onClick={() => navigate(routesConfig.home.menuList.path)}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Добавить блюда
      </Button>
    </div>
  );
}; 