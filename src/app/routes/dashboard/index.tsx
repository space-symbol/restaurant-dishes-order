import { Link } from "@/shared/ui/link";
import { useAuthStore } from "@/entities/auth";
import { routesConfig } from "@/shared/config/routes";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Доступ запрещен</h1>
          <p className="mb-4">У вас нет прав для доступа к этой странице</p>
          <Link to={routesConfig.home.path} variant="button">
            Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-8">Панель управления</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to={routesConfig.home.dashboard.orders.path}
          >
            <h2 className="text-xl font-semibold mb-2">Заказы</h2>
            <p className="text-gray-600">Управление заказами</p>
          </Link>
        </div>
      </div>
    </main>
  );
} 