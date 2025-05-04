import { Navigate, Outlet, useLocation } from "react-router";
import { Home, Package } from "lucide-react";
import cn from "@/shared/lib/cn";
import { Link } from "@/shared/ui/link";
import { routesConfig } from "@/shared/config/routes";
import { Route } from "../+types/root";
import { useAuthStore } from "@/entities/auth";
import { useAppNavigate } from "@/shared/hooks/use-navigate";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Savory | Панель управления" },
    { name: "description", content: "Панель управления для администратора" },
  ];
}

  const navItems = [
    {
      name: "Главная",
      href: routesConfig.home.dashboard.path,
      icon: Home,
    },
    {
      name: "Заказы",
      href: routesConfig.home.dashboard.orders.path,
      icon: Package,
    },
  ];

export default function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const isClient = typeof window !== 'undefined';

  if (!isAuthenticated && isClient) { 
    return <Navigate to={routesConfig.home.path} />
  }

  return (
    <div className="flex flex-grow pl-64">
      <div className="fixed left-0 top-header h-full w-64 shadow-sm">
        <div className="p-6">
          <h1>Панель управления</h1>
        </div>
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                disabled={!isActive}
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-grow p-6 [&>main]:flex-grow">
        <Outlet />
      </div>
    </div>
  );
} 