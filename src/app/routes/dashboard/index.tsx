import { routesConfig } from "@/shared/config/routes";
import { DashboardNavigationCard } from "@/app/widgets/dashboard-navigation-card";
import { Route } from "./+types";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Savory | Панель управления` },
    { name: "description", content: `Панель управления` },
  ];
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-8">Панель управления</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 [&_a]:h-full">
          <DashboardNavigationCard
            title="Заказы"
            description="Управление заказами, просмотр статусов и обработка"
            to={routesConfig.home.dashboard.orders.path}
          />

          <DashboardNavigationCard
            title="Меню"
            description="Управление блюдами, категориями и ценами"
            to={routesConfig.home.dashboard.menu.path}
          />

          <DashboardNavigationCard
            title="Отзывы"
            description="Модерация отзывов и управление рейтингами"
            to={routesConfig.home.dashboard.reviews.path}
          />

          {/* <DashboardNavigationCard
            title="Статистика"
            description="Аналитика продаж и популярности блюд"
            to={routesConfig.home.dashboard.statistics.path}
          /> */}
        </div>
      </div>
    </main>
  );
} 