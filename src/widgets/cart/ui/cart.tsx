import { useCartStore } from '@/entities/cart'
import { CartHeader } from './cart-header'
import { CartTotal } from './cart-total'
import { EmptyCart } from './empty-cart'
import { CartItem } from './cart-item'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useAppNavigate } from '@/shared/hooks/use-navigate'
import { routesConfig } from '@/shared/config/routes'

interface CartProps {
  className?: string;
}

export const Cart = ({ className }: CartProps) => {
  const { isOpen, items, toggleCart } = useCartStore()
  const navigate = useAppNavigate()

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-backdrop z-[200]" 
        onClick={toggleCart}
        role="presentation"
      />
        <div className={cn("absolute inset-0 m-auto p-2 sm:p-4 md:p-6 max-w-md w-full bg-cart-background text-cart-foreground rounded-lg max-h-[90vh] flex flex-col z-[200]", className)}>
          <CartHeader onClose={toggleCart} />
          <div className="flex-1 overflow-auto pr-1">
            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-2 sm:space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <>
              <CartTotal />
              <Button
                className="mt-4"
                onClick={() => {
                  toggleCart()
                  navigate(routesConfig.home.orders.new.path)
                }}
              >
                Оформить заказ
              </Button>
            </>
          )}
        </div>
    </>
  )
} 