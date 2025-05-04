import { routesConfig } from "@/shared/config/routes";
import { cn } from "@/shared/lib/utils";
import { Link } from "@/shared/ui/link";
import { useLocation } from "react-router";
import { Home, Utensils, ShoppingBag, MessageSquare } from "lucide-react";

const navItems = [
  {
    title: "Обзор",
    href: routesConfig.home.dashboard.path,
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: "Меню",
    href: routesConfig.home.dashboard.menu.path,
    icon: <Utensils className="w-6 h-6" />,
  },
  {
    title: "Заказы",
    href: routesConfig.home.dashboard.orders.path,
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    title: "Отзывы",
    href: routesConfig.home.dashboard.reviews.path,
    icon: <MessageSquare className="w-6 h-6" />,
  },
  // {
  //   title: "Статистика",
  //   href: routesConfig.home.dashboard.statistics.path,
  //   icon: <BarChart3 className="w-6 h-6" />,
  // },
];

export const AdminNav = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            location.pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}; 