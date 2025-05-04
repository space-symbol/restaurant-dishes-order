import { useCartStore } from "@/entities/cart";
import { OrderForm } from "@/entities/order";
import { Cart } from "@/widgets/cart";
import { OrderHeader } from "@/widgets/order/ui/order-header";
import { OrderSummary } from "@/widgets/order/ui/order-summary";
import { EmptyCart } from "@/widgets/order/ui/empty-cart";

export default function NewOrder() {
  const { items } = useCartStore();

  return (
    <main className="container-custom py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <OrderHeader />
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <Cart className="mb-6" />
              <OrderForm />
            </>
          )}
        </div>
        <OrderSummary items={items} />
      </div>
    </main>
  );
} 