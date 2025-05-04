import { Link } from "@/shared/ui/link";
import { useAuthStore } from "@/entities/auth";
import { routesConfig } from "@/shared/config/routes";

export default function DashboardPage() {
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