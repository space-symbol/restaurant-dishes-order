import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Route } from "./+types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: `Savory | Статистика` },
    { name: "description", content: `Статистика` },
  ];
}

export default function DashboardStatistics() {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Статистика</h1>
        <div className="flex gap-2">
          <Button variant="outline">Период</Button>
          <Button variant="outline">Экспорт</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего заказов</h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-sm text-green-600 mt-2">+12% за месяц</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Средний чек</h3>
          <p className="text-2xl font-bold">₽ 2,500</p>
          <p className="text-sm text-green-600 mt-2">+5% за месяц</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Активные пользователи</h3>
          <p className="text-2xl font-bold">456</p>
          <p className="text-sm text-green-600 mt-2">+8% за месяц</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Средний рейтинг</h3>
          <p className="text-2xl font-bold">4.8</p>
          <p className="text-sm text-green-600 mt-2">+0.2 за месяц</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Популярные блюда</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Блюдо 1</p>
                <p className="text-sm text-gray-500">Заказано 234 раза</p>
              </div>
              <span className="text-lg font-bold">₽ 1,500</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Блюдо 2</p>
                <p className="text-sm text-gray-500">Заказано 198 раз</p>
              </div>
              <span className="text-lg font-bold">₽ 2,000</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Блюдо 3</p>
                <p className="text-sm text-gray-500">Заказано 156 раз</p>
              </div>
              <span className="text-lg font-bold">₽ 1,800</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Последние отзывы</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">Блюдо 1</p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  ★ 5.0
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Отличное блюдо, всем рекомендую!
              </p>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">Блюдо 2</p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  ★ 4.5
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Очень вкусно, но порция могла бы быть больше.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
} 