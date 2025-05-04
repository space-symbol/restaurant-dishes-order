import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { OrdersList } from "@/entities/order/ui/orders-list";
import { Route } from "../../+types/root";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Savory | Мои заказы" },
    { name: "description", content: "Мои заказы" },
  ];
}

export default function Orders() {
  const [sortOrder, setSortOrder] = useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");

  return (
    <main className="container-custom flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
      </div>

      <div className="flex flex-col flex-grow gap-6">
        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <Button
              variant={sortOrder === "DATE_DESC" ? "primary" : "outline"}
              onClick={() => setSortOrder("DATE_DESC")}
            >
              Сначала новые
            </Button>
            <Button
              variant={sortOrder === "DATE_ASC" ? "primary" : "outline"}
              onClick={() => setSortOrder("DATE_ASC")}
            >
              Сначала старые
            </Button>
          </div>
        </div>

        <OrdersList orders={[]} isLoading={false} />
      </div>
    </main>
  );
}