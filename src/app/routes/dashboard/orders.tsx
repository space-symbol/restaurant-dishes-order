import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { formatCurrency } from "@/shared/lib/currency";

export default function DashboardOrders() {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заказы</h1>
        <div className="flex gap-2">
          <Button variant="outline">Экспорт</Button>
          <Button>Фильтры</Button>
        </div>
      </div>

      <div className="p-6 border rounded flex-grow overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">ID</th>
                <th className="pb-4 font-medium">Дата</th>
                <th className="pb-4 font-medium">Сумма</th>
                <th className="pb-4 font-medium">Статус</th>
                <th className="pb-4 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4">#1234</td>
                <td className="py-4">
                  {format(new Date(), "d MMMM yyyy, HH:mm", { locale: ru })}
                </td>
                <td className="py-4">{formatCurrency(1500)}</td>
                <td className="py-4">
                  <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                    Выполнен
                  </span>
                </td>
                <td className="py-4">
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="py-4">#1235</td>
                <td className="py-4">
                  {format(new Date(), "d MMMM yyyy, HH:mm", { locale: ru })}
                </td>
                <td className="py-4">{formatCurrency(2300)}</td>
                <td className="py-4">
                  <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    В процессе
                  </span>
                </td>
                <td className="py-4">
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
} 