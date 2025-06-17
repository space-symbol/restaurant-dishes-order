import { FeaturedDishes } from "@/widgets/featured-dishes";
import { Route } from "./+types/home";
import { getMenuItemsWithRatings } from "@/features/menu-aggregate/api/get-menu-items-with-ratings";

export const meta = () => {
  return [
    { title: "Savory | Главная" },
    { name: "description", content: "Ресторан Savory - изысканная кухня и уютная атмосфера" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const featuredDishes = await getMenuItemsWithRatings({ sortBy: 'RATE_DESC' });
  
  return {
    featuredDishes: {
      items: featuredDishes.data ?? [],
      total: featuredDishes.data?.length ?? 0,
    }
  };
}

export async function clientLoader({ serverLoader, request }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  return serverData;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main>
      <FeaturedDishes initialData={loaderData.featuredDishes} />
    </main>
  );
} 