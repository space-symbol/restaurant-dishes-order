import { Button } from "@/shared/ui/button";
import { routesConfig } from "@/shared/config/routes";
import { useAppNavigate } from "@/shared/hooks/use-navigate";

interface EmptyCartProps {
  className?: string;
}

export const EmptyCart = ({ className }: EmptyCartProps) => {
  const navigate = useAppNavigate();

  return (
    <div className={`text-center py-12 ${className}`}>
      <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
      <Button onClick={() => navigate(routesConfig.home.menu.path)}>
        Перейти в меню
      </Button>
    </div>
  );
}; 