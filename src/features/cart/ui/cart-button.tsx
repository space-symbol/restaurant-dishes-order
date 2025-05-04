import { useCartStore, type CartItem } from '@/entities/cart/model/store'

interface CartButtonProps {
  item: Omit<CartItem, 'quantity'>
}

export function CartButton({ item }: CartButtonProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const cartItem = items.find((i) => i.id === item.id)

  const handleAddToCart = () => {
    try {
      if (cartItem) {
        updateQuantity(item.id, cartItem.quantity + 1)
      } else {
        addItem(item)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  const handleDecreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(item.id, cartItem.quantity - 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {cartItem ? (
        <>
          <button
            onClick={handleDecreaseQuantity}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-l-md"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100">
            {cartItem.quantity}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-r-md"
          >
            +
          </button>
        </>
      ) : (
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Add to Cart
        </button>
      )}
    </div>
  )
} 