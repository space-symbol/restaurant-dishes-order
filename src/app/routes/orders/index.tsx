import { UserOrders } from "@/widgets/user-orders";
import { Route } from "../../+types/root";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Savory | Мои заказы" },
    { name: "description", content: "Мои заказы" },
  ];
}

export default function Orders() {
  return (
    <main className="container-custom flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
      </div>
      <UserOrders />
    </main>
  );
}