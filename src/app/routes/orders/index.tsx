import { UserOrders } from "@/widgets/user-orders";
import { Route } from "./+types/orders";
import { getUserOrders } from "@/features/order/api/get-user-orders";

export const meta = () => {
  return [
    { title: "Savory | Мои заказы" },
    { name: "description", content: "Мои заказы" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort') as "DATE_ASC" | "DATE_DESC" | null;
  const page = parseInt(url.searchParams.get('page') || '0');
  const size = 10;
  
  const response = await getUserOrders({
    sort: sort || "DATE_DESC",
    from: page * size,
    size,
  });
  
  return {
    orders: response.data?.orders ?? [],
    total: response.data?.total ?? 0,
  };
}

export async function clientLoader({ serverLoader, request }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  return serverData;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Orders({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="container-custom flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
      </div>
      <UserOrders initialData={loaderData} />
    </main>
  );
}