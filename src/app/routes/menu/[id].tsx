import { DishDetails } from "@/widgets/dish-details/ui/dish-details";
import { CreateReviewForm } from "@/features/review/ui/create-review-form";
import { data, useParams } from "react-router";
import { useHasOrderedItem } from "@/features/order/model/hooks/use-has-ordered-item";
import { Route } from "../../+types/root";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Savory | ${params.id}` },
    { name: "description", content: `Меню ${params.id}` },
  ];
}

export const clientLoader = async ({ params }: Route.LoaderArgs) => {
  if (!params.id) {
    throw data(null, { status: 404, statusText: "Not Found" });
  }
}

export default function MenuItemPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Menu item not found</div>;
  }

  const hasOrdered = useHasOrderedItem(id);

  return (
    <main className="container-custom">
      <DishDetails className="flex-grow" menuId={id} />
      {hasOrdered && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Оцените блюдо</h2>
          <CreateReviewForm menuItemId={id} />
        </div>
      )}
    </main>
  );
}; 